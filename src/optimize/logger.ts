import type {ILogger} from "@gltf-transform/core";
import {Loggers} from "3d-tiles-tools";

const log = Loggers.get('glTF-Transform')

/**
 * Logger 实现
 */
export class Logger implements ILogger {
    debug(text: string): void {
        log.debug(text);
    }

    info(text: string): void {
        log.info(text);
    }

    warn(text: string): void {
        log.warn(text);
    }

    error(text: string): void {
        log.error(text);
    }
}

export const logger: Logger = new Logger()