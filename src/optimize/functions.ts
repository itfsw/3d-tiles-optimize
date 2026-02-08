import {type Pipeline, type TilesetStage} from '3d-tiles-tools'
import {ExPipelineExecutor} from "../pipeline/ExPipelineExecutor.js";
import type {OptimizeOptions} from "../types.js";

/**
 * 优化
 * @param input 输入路径
 * @param output 输出路径
 * @param options 配置
 */
export function optimize(input: string, output: string, options: OptimizeOptions): Promise<void> {
    // 创建流水线
    const tilesetStages: TilesetStage[] = [];
    const pipeline: Pipeline = {
        input: input,
        output: output,
        tilesetStages: tilesetStages
    }
    // 添加流水线步骤
    // 1. upgrade
    tilesetStages.push({
        name: "upgrade",
        description: "Upgrade the input tileset to the latest version"
    })
    // 2. combine
    if (options.combine) {
        tilesetStages.push({
            name: "combine",
            description: "Combine all external tilesets into one"
        })
    }
    // 3. 优化
    tilesetStages.push({
        name: "_optimizeGlb",
        description: "Optimize GLB",
        contentStages: [
            {
                name: "optimizeGlb",
                description: "Apply glTF-Transform to each GLB content, with the given options",
                options: options
            }
        ]
    })

    // 执行流水线
    return ExPipelineExecutor.executePipeline(pipeline, true)
}