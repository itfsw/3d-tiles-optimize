# 3d-tiles-optimize

## Overview

The 3D Tiles Optimize are a tool for optimizing 3D Tiles data, replace `optimizeGlb` contentStage lib
from [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline)
to [glTF-Transform](https://github.com/donmccurdy/glTF-Transform).

## Getting Started

Install [Node.js](https://nodejs.org/en/) if you don't already have it, and then:

``` shell
npm install -g 3d-tiles-optimize
```

Using 3d-tiles-optimize as a command-line tool:

```shell
3d-tiles-optimize optimize ./input ./output
```

## Optimize Options

| Option                           | Description                                                                                                                                                                        | Default |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| 🐦 COMMON                        |
| `--logLevel`                     | The log level. Valid values are trace, debug, info, warn, error, fatal, and silent                                                                                                 | warn    |
| 🌓 PIPELINE                      |
| `--combine`                      | Combines all external tilesets into a single tileset.                                                                                                                              | false   |
| 📦 PACKAGE                       |
| `--dedup.enable`                 | Enable Deduplicate accessors and textures.                                                                                                                                         | true    |
| `--prune.enable`                 | Enable Remove unreferenced properties from the file.                                                                                                                               | true    |
| 🫖  GEOMETRY                     |
| `--draco.enable`                 | Enable Compress geometry with Draco.                                                                                                                                               | true    |
| `--meshopt.enable`               | Enable Compress geometry and animation with Meshopt.                                                                                                                               | false   |
| `--meshopt.level`                | Meshopt compress level.                                                                                                                                                            | high    |
| 🎨 MATERIAL                      |
| 🖼  TEXTURE                      |
| `--textureCompress.enable`       | Enable Textures Compress.                                                                                                                                                          | true    |
| `--textureCompress.targetFormat` | Target image format. If specified, included textures in other formats will be converted.                                                                                           | webp    |
| `--textureCompress.resize`       | Resizes textures to given maximum [width,height] \| false, preserving aspect ratio. Presets "nearest-pot", "ceil-pot", and "floor-pot" resize textures to power-of-two dimensions. | false   |
| ⏯️ ANIMATION                     |
| `--resample.enable`              | Enable Resample animations, losslessly deduplicating keyframes.                                                                                                                    | true    |

