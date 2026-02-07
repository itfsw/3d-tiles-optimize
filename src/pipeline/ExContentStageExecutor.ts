import {
    type BasicTilesetProcessor,
    ContentDataTypes,
    type ContentStage,
    ContentStageExecutor,
    ContentStages,
    PipelineError,
    type TilesetEntry
} from "3d-tiles-tools";
import {optimizeGlb} from "../optimize/glb.js";

/**
 * 拓展 ContentStageExecutor
 */
export class ExContentStageExecutor {
    /**
     * Execute the given `ContentStage`.
     *
     * @param contentStage - The `ContentStage` object
     * @param tilesetProcessor - The `BasicTilesetProcessor`
     * @returns A promise that resolves when the process is finished
     * @throws PipelineError If one of the processing steps causes
     * an error.
     */
    static async executeContentStage(
        contentStage: ContentStage,
        tilesetProcessor: BasicTilesetProcessor
    ) {
        try {
            if (contentStage.name === ContentStages.CONTENT_STAGE_OPTIMIZE_GLB) {
                const options = contentStage.options;
                await ExContentStageExecutor.executeOptimizeGlb(tilesetProcessor, options);
            } else {
                await ContentStageExecutor.executeContentStage(
                    contentStage,
                    tilesetProcessor
                );
            }
        } catch (e) {
            throw new PipelineError(`${e}`);
        }
    }

    /**
     * Performs the 'optimizeGlb' content stage with the given processor.
     *
     * This will process all tile contents entries of the source tileset
     * that have the `CONTENT_TYPE_GLB`, and apply the `gltf-pipeline`
     * optimization with the given options to them.
     *
     * @param tilesetProcessor - The `BasicTilesetProcessor`
     * @param options - The options for `gltf-pipeline`
     * @returns A promise that resolves when the process is finished
     * @throws Error If one of the processing steps causes
     * an error.
     */
    private static async executeOptimizeGlb(
        tilesetProcessor: BasicTilesetProcessor,
        options: any
    ): Promise<void> {
        // The entry processor receives the source entry, and
        // returns a target entry where the the `value` contains
        // GLB data that was optimized with `gltf-pipeline`
        // and the given options
        const entryProcessor = async (
            sourceEntry: TilesetEntry,
            type: string | undefined
        ) => {
            if (type !== ContentDataTypes.CONTENT_TYPE_GLB) {
                return sourceEntry;
            }
            const targetValue = await optimizeGlb(
                sourceEntry.value,
                options
            );
            const targetEntry = {
                key: sourceEntry.key,
                value: targetValue,
            };
            return targetEntry;
        };
        await tilesetProcessor.processTileContentEntries(
            (uri: string) => uri,
            entryProcessor
        );
    }
}