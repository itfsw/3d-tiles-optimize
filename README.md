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

| Option                     | Description                                                                                                                                                                        | Types                                                                  | Default |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|---------|
| 🐦 COMMON                  |
| `--logLevel`               | The log level.                                                                                                                                                                     | `trace` / `debug` / `info` / `warn` / `error` / `fatal` /  `silent`    | warn    |
| 🌓 PIPELINE                |
| `--combine`                | Combines all external tilesets into a single tileset.                                                                                                                              | boolean                                                                | false   |
| 📦 PACKAGE                 |
| `--dedup`                  | Deduplicate accessors and textures.                                                                                                                                                | boolean                                                                | true    |
| `--prune`                  | Removes properties from the file if they are not referenced by a Scene.                                                                                                            | boolean                                                                | true    |
| `--prune.attributes`       | Whether to prune unused vertex attributes.                                                                                                                                         | boolean                                                                | true    |
| `--prune.solidTextures`    | Whether to prune solid (single-color) textures, converting them to material factors.                                                                                               | boolean                                                                | true    |
| 🌍 SCENE                   |
| `--instance`               | Create GPU instances from shared mesh references.                                                                                                                                  | boolean                                                                | true    |
| `--instance.min`           | Number of instances required for instancing.                                                                                                                                       | number                                                                 | 5       |
| `--flatten`                | Flatten scene graph.                                                                                                                                                               | number                                                                 | true    |
| 🫖  GEOMETRY               |
| `--draco`                  | Compress geometry with Draco.                                                                                                                                                      | boolean                                                                | false   |
| `--meshopt`                | Compress geometry and animation with Meshopt.                                                                                                                                      | boolean                                                                | true    |
| `--meshopt.level`          | Meshopt compress level.                                                                                                                                                            | `medium` / `high`                                                      | high    |
| `--quantize`               | Quantize geometry, reducing precision and memory.                                                                                                                                  | boolean                                                                | false   |
| `--weld`                   | Merge equivalent vertices. Required when simplifying geometry.                                                                                                                     | boolean                                                                | true    |
| `--simplify`               | Simplify mesh geometry with meshoptimizer.                                                                                                                                         | boolean                                                                | true    |
| `--simplify.error`         | Simplification error tolerance, as a fraction of mesh extent.                                                                                                                      | number                                                                 | 0.0001  |
| `--simplify.ratio`         | Target ratio (0–1) of vertices to keep.                                                                                                                                            | number                                                                 | 0.0     |
| `--simplify.lockBorder`    | Whether to lock topological borders of the mesh.                                                                                                                                   | boolean                                                                | false   |
| 🎨 MATERIAL                |
| `--palette`                | Creates palette textures and merges materials.                                                                                                                                     | boolean                                                                | true    |
| `--palette.min`            | Minimum number of blocks in the palette texture. If fewer unique material values are found, no palettes will be generated.                                                         | number                                                                 | 5       |
| `--join`                   | Join meshes and reduce draw calls. Requires `--flatten`.                                                                                                                           | boolean                                                                | true    |
| `--join.meshes`            | Join distinct meshes and nodes. Requires `--join`.                                                                                                                                 | boolean                                                                | true    |
| `--join.named`             | Join named meshes and nodes. Requires `--join`.                                                                                                                                    | boolean                                                                | true    |
| 🖼  TEXTURE                |
| `--textureCompress`        | Texture compression format. KTX2 optimizes VRAM usage and performance; AVIF and WebP optimize transmission size. Auto recompresses in original format.                             | `ktx2` / `webp` / `avif` / `auto` / `false`                            | webp    |
| `--textureCompress.resize` | Resizes textures to given maximum [width,height] \| false, preserving aspect ratio. Presets "nearest-pot", "ceil-pot", and "floor-pot" resize textures to power-of-two dimensions. | `[number,number]` / `nearest-pot` / `ceil-pot` / `floor-pot` / `false` | false   |
| ⏯️ ANIMATION               |
| `--resample`               | Resample animations, losslessly deduplicating keyframes                                                                                                                            | boolean                                                                | true    |
| `--sparse`                 | Reduces storage for zero-filled arrays. If disabled, existing accessors (sparse or not) are left unchanged.                                                                        | boolean                                                                | true    |
