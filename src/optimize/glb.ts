import draco3d from 'draco3dgltf';
import {NodeIO, type Transform} from "@gltf-transform/core";
import {ALL_EXTENSIONS} from "@gltf-transform/extensions";
import {logger} from "./logger.js";

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
export async function optimizeGlb(glbBuffer: Buffer, options: any): Promise<Buffer> {
    options = options ?? {};
    return new Promise((resolve, reject) => {
        // 读取 buffer
        createNodeIO().then(io => {
            io.readBinary(glbBuffer).then(document => {
                // 优化配置
                const transforms: Transform[] = []
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