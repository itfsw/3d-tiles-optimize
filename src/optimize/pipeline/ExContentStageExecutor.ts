import {type BasicTilesetProcessor, type ContentStage, ContentStageExecutor, PipelineError} from "3d-tiles-tools";


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
            if (contentStage.name === '') {

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
}