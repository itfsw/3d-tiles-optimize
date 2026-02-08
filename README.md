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
| Option              | Description                                                                        | Default |
|---------------------|------------------------------------------------------------------------------------|---------|
| `--logLevel`        | The log level. Valid values are trace, debug, info, warn, error, fatal, and silent | warn    |
| `--combine`         | Combines all external tilesets into a single tileset.                              | false   |
| `--resample.enable` | Enable Losslessly resample animation frames.                                       | true    |

