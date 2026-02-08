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

[@see glTF-Transform Configuration](https://gltf-transform.dev/)

| Option                           | Description                                                                                                                                                                        | Default |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| 🐦 COMMON                        |
| `--logLevel`                     | The log level. Valid values are trace, debug, info, warn, error, fatal, and silent                                                                                                 | warn    |
| 🌓 PIPELINE                      |
| `--combine`                      | Combines all external tilesets into a single tileset.                                                                                                                              | false   |
| 📦 PACKAGE                       |
| `--dedup`                        | Deduplicate accessors and textures.                                                                                                                                                | true    |
| `--prune`                        | Removes properties from the file if they are not referenced by a Scene.                                                                                                            | true    |
| `--prune.attributes`             | Whether to prune unused vertex attributes.                                                                                                                                         | true    |
| `--prune.solidTextures`          | Whether to prune solid (single-color) textures, converting them to material factors.                                                                                               | true    |
| 🌍 SCENE                         |
| `--instance`                     | Create GPU instances from shared mesh references.                                                                                                                                  | true    |
| `--instance.min`                 | Number of instances required for instancing.                                                                                                                                       | 5       |
| `--flatten`                      | Flatten scene graph.                                                                                                                                                               | true    |
| 🫖  GEOMETRY                     |
| `--draco`                        | Compress geometry with Draco.                                                                                                                                                      | true    |
| `--meshopt`                      | Compress geometry and animation with Meshopt.                                                                                                                                      | false   |
| `--meshopt.level`                | Meshopt compress level.                                                                                                                                                            | high    |
| 🎨 MATERIAL                      |
| `--palette`                      | Creates palette textures and merges materials.                                                                                                                                     | true    |
| `--palette.min`                  | Minimum number of blocks in the palette texture. If fewer unique material values are found, no palettes will be generated.                                                         | 5       |
| `--join`                         | Join meshes and reduce draw calls. Requires `--flatten`.                                                                                                                           | true    |
| `--join.meshes`                  | Join distinct meshes and nodes. Requires `--join`.                                                                                                                                 | true    |
| `--join.named`                   | Join named meshes and nodes. Requires `--join`.                                                                                                                                    | true    |
| 🖼  TEXTURE                      |
| `--textureCompress`              | Textures Compress.                                                                                                                                                                 | true    |
| `--textureCompress.targetFormat` | Target image format. If specified, included textures in other formats will be converted.                                                                                           | webp    |
| `--textureCompress.resize`       | Resizes textures to given maximum [width,height] \| false, preserving aspect ratio. Presets "nearest-pot", "ceil-pot", and "floor-pot" resize textures to power-of-two dimensions. | false   |
| ⏯️ ANIMATION                     |
| `--resample`                     | Resample animations, losslessly deduplicating keyframes.                                                                                                                           | true    |

