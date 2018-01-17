===

标题: amap-building-crawler 高德地图3D建筑信息爬虫项目
标签: nodejs, 爬虫, GIS, geojson

===

# [amap-building-crawler](https://github.com/parksben/amap-building-crawler)

A crawler project for fetching 3d building data from amap and tramsform its to GeoJSON.<br>
高德地图3D建筑信息爬虫项目，用于爬取高德地图的 3D 建筑物数据，并将其转存为 GeoJSON 数据格式


## Doc

#### 1. Clone remote codes to local, then use the `yarn` command to install the project in local directory.

#### 2. Execute `mkdir dist` in the project root directory (do not need to do this if the directory already exists).

#### 3. Rewrite the latitude and longitude range in `index.js` file where you want to crawl the data (upper left corner & bottom right corner).

```js
const lnglatRange = [
  [118.01307678222655, 24.596143627409358],
  [118.15830230712889, 24.452462684995407],
];
```

#### 4. Execute `yarn start` in the project root directory, the retrieved data will be stored in the `dist` directory as a `.geojson` file.

## 说明

#### 1. clone 代码到本地，根目录使用 `yarn` 命令安装项目

#### 2. 项目根目录下执行 `mkdir dist`（若目录已存在则不需要）

#### 3. 修改 `index.js` 文件中需要爬取的坐标经纬度范围：

```js
// 需要爬取的经纬度范围（左上角、右下角）
const lnglatRange = [
  [118.01307678222655, 24.596143627409358],
  [118.15830230712889, 24.452462684995407],
];
```

#### 4. 项目根目录下执行 `yarn start`，爬取的 `.geojson` 数据将存储到 `dist` 目录下
