import sharp from "sharp";
import draco3d from 'draco3dgltf';
import {Loggers} from "3d-tiles-tools";
import type {OptimizeOptions} from "../types.js";
import {ALL_EXTENSIONS} from "@gltf-transform/extensions";
import {NodeIO, type Transform} from "@gltf-transform/core";
import {MeshoptDecoder, MeshoptEncoder} from 'meshoptimizer';
import {dedup, draco, instance, meshopt, palette, prune, resample, textureCompress} from '@gltf-transform/functions';

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
 * @param options - Options specifying custom glTF-Transform behavior.
 * @returns A promise that resolves to the optimized binary glTF.
 */
export async function optimizeGlb(glbBuffer: Buffer, options: OptimizeOptions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        // 读取 buffer
        createNodeIO().then(io => {
            io.readBinary(glbBuffer).then(document => {
                // 优化配置
                const transforms: Transform[] = []

                if (options.dedup) {
                    logger.info('GLB Remove duplicate vertex or texture data, if any.')
                    transforms.push(dedup())
                }

                if (options.instance) {
                    logger.info('Create GPU instances from shared mesh references.')
                    transforms.push(instance({
                        min: options.instanceMin
                    }))
                }

                if (options.palette) {
                    logger.info('Creates palette textures and merges materials.')
                    transforms.push(palette())
                }

                if (options.resample) {
                    logger.info('GLB Losslessly resample animation frames.')
                    transforms.push(resample())
                }

                if (options.prune) {
                    logger.info('GLB Remove unused nodes, textures, or other data.')
                    transforms.push(prune())
                }


                if (options.textureCompress) {
                    logger.info('GLB Textures Compress.')
                    const resize = options.textureCompressResize === false ? undefined : options.textureCompressResize;
                    transforms.push(textureCompress({
                        encoder: sharp,
                        targetFormat: options.textureCompressTargetFormat,
                        resize: resize,
                    }))
                }

                if (options.draco) {
                    logger.info('GLB Compress mesh geometry with Draco.')
                    transforms.push(draco())
                } else if (options.meshopt) {
                    logger.info('Compress geometry and animation with Meshopt.')
                    transforms.push(meshopt({
                        encoder: MeshoptEncoder,
                        level: options.meshoptLevel
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