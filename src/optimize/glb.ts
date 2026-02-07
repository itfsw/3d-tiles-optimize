/**
 * Given an input buffer containing a binary glTF asset, optimize it
 * using gltf-pipeline with the provided options.
 *
 * This method also performs a few updates of certain legacy
 * features that are specific for the GLB data that is part
 * of I3DM and B3DM. Details are not specified here.
 *
 * @param glbBuffer - The buffer containing the binary glTF.
 * @param options - Options specifying custom gltf-pipeline behavior.
 * @returns A promise that resolves to the optimized binary glTF.
 */
export async function optimizeGlb(glbBuffer: Buffer, options: any): Promise<Buffer> {
    options = options ?? {};

    return new Promise((resolve, reject) => {

    });
}