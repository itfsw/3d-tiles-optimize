import sharp from "sharp";
import draco3d from 'draco3dgltf';
import {logger} from "./logger.js";
import {ALL_EXTENSIONS} from "@gltf-transform/extensions";
import {NodeIO, type Transform} from "@gltf-transform/core";
import {dedup, draco, prune, resample, textureCompress} from '@gltf-transform/functions';
import type {OptimizeOptions} from "../types.js";

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

                // Losslessly resample animation frames.
                if (options.resampleEnable) {
                    transforms.push(resample())
                }
                // Remove unused nodes, textures, or other data.
                transforms.push(prune())
                // Remove duplicate vertex or texture data, if any.
                transforms.push(dedup())
                // Compress mesh geometry with Draco.
                transforms.push(draco())
                // Convert textures to WebP (Requires glTF Transform v3 and Node.js).
                transforms.push(textureCompress({
                    encoder: sharp,
                    targetFormat: 'webp',
                    resize: [1024, 2024],
                }))

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
        });
}