import sharp from "sharp";
import draco3d from 'draco3dgltf';
import {
    dedup,
    draco,
    flatten,
    instance,
    join,
    meshopt,
    palette,
    prune,
    resample,
    simplify,
    textureCompress,
    weld
} from '@gltf-transform/functions';
import {Loggers} from "3d-tiles-tools";
import type {OptimizeOptions} from "../types.js";
import {ALL_EXTENSIONS} from "@gltf-transform/extensions";
import {NodeIO, type Transform} from "@gltf-transform/core";
import {MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier} from 'meshoptimizer';
import { ready as resampleReady, resample as resampleWASM } from 'keyframe-resample';

const logger = Loggers.get('optimizeGlb')

/**
 * Given an input buffer containing a binary glTF asset, optimize it
 * using glTF-Transform with the provided options.
 *
 * This method also performs a few updates of certain legacy
 * features that are specific for the GLB data that is part
 * of I3DM and B3DM. Details are not specified here.
 *
 * @param glbBuffer - The buffer containing the binary glTF.
 * @param opts - Options specifying custom glTF-Transform behavior.
 * @returns A promise that resolves to the optimized binary glTF.
 */
export async function optimizeGlb(glbBuffer: Buffer, opts: OptimizeOptions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        // 读取 buffer
        createNodeIO().then(io => {
            io.readBinary(glbBuffer).then(document => {
                // 优化配置
                const transforms: Transform[] = []

                if (opts.dedup) {
                    logger.info('Deduplicate accessors and textures.')
                    transforms.push(dedup())
                }

                if (opts.instance) {
                    logger.info('Create GPU instances from shared mesh references.')
                    transforms.push(instance({
                        min: opts.instanceMin
                    }))
                }

                if (opts.palette) {
                    logger.info('Creates palette textures and merges materials.')
                    transforms.push(palette({
                        min: opts.paletteMin,
                        keepAttributes: !opts.prune || !opts.pruneAttributes,
                    }))
                }

                if (opts.flatten) {
                    logger.info('Flatten scene graph.')
                    transforms.push(flatten())
                    if (opts.join) {
                        logger.info('Join meshes and reduce draw calls. Requires `--flatten`.')
                        transforms.push(
                            join({
                                keepNamed: !opts.joinNamed,
                                keepMeshes: !opts.joinMeshes,
                            }),
                        );
                    }
                }

                if (opts.weld) {
                    logger.info('Merge equivalent vertices. Required when simplifying geometry.')
                    transforms.push(weld())

                    if (opts.simplify) {
                        logger.info('Simplify mesh geometry with meshoptimizer.')
                        transforms.push(
                            simplify({
                                simplifier: MeshoptSimplifier,
                                error: opts.simplifyError,
                                ratio: opts.simplifyRatio,
                                lockBorder: opts.simplifyLockBorder,
                            }),
                        );
                    }
                }

                if (opts.resample) {
                    logger.info('Resample animations, losslessly deduplicating keyframes.')
                    transforms.push(resample({
                        ready: resampleReady,
                        resample: resampleWASM
                    }))
                }

                if (opts.prune) {
                    logger.info('Removes properties from the file if they are not referenced by a Scene.')
                    transforms.push(prune({
                        keepAttributes: !opts.pruneAttributes,
                        keepIndices: false,
                        keepLeaves: false,
                        keepSolidTextures: !opts.pruneSolidTextures,
                    }))
                }


                if (opts.textureCompress) {
                    logger.info('GLB Textures Compress.')
                    const resize = opts.textureCompressResize === false ? undefined : opts.textureCompressResize;
                    transforms.push(textureCompress({
                        encoder: sharp,
                        targetFormat: opts.textureCompressTargetFormat,
                        resize: resize,
                    }))
                }

                if (opts.draco) {
                    logger.info('GLB Compress mesh geometry with Draco.')
                    transforms.push(draco())
                } else if (opts.meshopt) {
                    logger.info('Compress geometry and animation with Meshopt.')
                    transforms.push(meshopt({
                        encoder: MeshoptEncoder,
                        level: opts.meshoptLevel
                    }))
                }

                document.transform(...transforms).then(doc => {
                    // 数据输出
                    io.writeBinary(doc).then(data => {
                        resolve(Buffer.from(data));
                    }).catch(reject)
                }).catch(reject)
            }).catch(reject)
        }).catch(reject)
    });
}

/**
 * 创建NodeIO
 */
async function createNodeIO() {
    // Configure I/O.
    return new NodeIO()
        .setLogger(logger)
        .registerExtensions(ALL_EXTENSIONS)
        .registerDependencies({
            'draco3d.decoder': await draco3d.createDecoderModule(),
            'draco3d.encoder': await draco3d.createEncoderModule(),
            'meshopt.decoder': MeshoptDecoder,
            'meshopt.encoder': MeshoptEncoder
        });
}