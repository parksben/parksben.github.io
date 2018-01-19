===

标题: 3D GIS 应用开发 —— 基于 Mapbox GL 的实践总结
标签: GIS, webGL, 3D可视化, 前端

===

最近在折腾的 web 端的可视化项目，由于相关业务的需要，用到了 Mapbox 这一地图开发的神器。在此先奉上一个基于mapbox-gl实现的demo（来源：[uber的deck.gl项目](https://uber.github.io/deck.gl/#/)）：

![demo](http://upload-images.jianshu.io/upload_images/590155-e16a70b0ec98c157?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下面我们从这个项目一步步来介绍 Mapbox 的前端 GIS 引擎 [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js).

# 一、简单了解
首先，Mapbox 在地图领域是一家很 Newbee 的公司。已为 Foursquare、Pinterest、Evernote、金融时报、天气频道、优步科技 等公司的网站提供了订制在线地图服务。

自2010年起，该公司快速地拓展了订制地图的市场地位，以回应 Google地图 等地图供应商提供的有限选择。Mapbox 是一些开放源代码地图库及应用程序的创建者或最大的贡献者，其中包含了MBTiles 规范、TileMill 制图 IDE、Leaflet JavaScript 库，以及 CartoCSS 地图格式化语言与语法分析器等。

该公司的数据同时从开放与专有的来源获取，开放的数据源如 开放街图（OSM, Open Street Map） 以及 NASA 等，而专有的数据源则包含了 DigitalGlobe。其技术奠基于 Node.js、CouchDB、Mapnik、GDAL 与 Leafletjs。

[图片上传失败...(image-e27a1b-1515395418070)]

Mapbox 针对不同平台均开发了相应的 GIS 引擎以满足开发者或相关用户的需要，如：iOS SDK（用于iOS端开发）、Android SDK（用于Andriod端开发）、Navigation SDK（用于Navigation端开发）、Unity SDK（用于Unity端开发）、GL JS（用于web端开发）。不同平台的SDK，除使用方式不同外，功能特性上也多多少少存在不同。此外，Uber还针对react开发了 [react-map-gl](https://github.com/uber/react-map-gl)。总的来说，Mapbox的开源技术栈是非常全面的。

# 二、轻松上手

[图片上传失败...(image-426b0b-1515395418070)]

mapbox-gl 的 [文档](https://www.mapbox.com/mapbox-gl-js/api/) 由 API、Style Specification、Example、Plugins 四部分内容组成。

顾名思义，API 是一般框架(类库)提供给用户的全部接口（方法）的说明书；Style Specification 是 Mapbox 地图的样式规范；Example 是一些常用功能或常见业务的代码示例，囊括了使用 Mapbox 所能实现的大部分功能效果；Plugins 则是官方推荐的可与 mapbox-gl 一同使用的一些增效插件和开源项目，如一些第三方的UI控件、显示类插件、框架集成工具、开发辅助工具、实用工具类库等等。

对于初了解 Mapbox 的童鞋，建议先从官网的 Example 入手，能够较快掌握 mapbox-gl 的使用并投入开发实践。

# 三、快速实践

下面以文章开头展示的项目为主，介绍其实战步骤。

## 1. 加载地图：
由于使用在线地图服务和 `style` 时需要验证用户 `token`，所以在使用 `mapboxgl` 时需要先配置用户 `token`（在Mapbox官网注册用户即可获取）。

```js
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = '<Your Token Here>';
```

接下来使用创建地图实例。主要配置项如下：

```js
const myMap = new mapboxgl.Map({
  container: '<Id of Container Element>',
  style: '<Your Style Here>',
  center: [112.508203125, 37.97980872872457],
  zoom: 4,
  pitch: 0,
  bearing: 0,
});
```

其中，`container` 是地图容器的元素 `id`，`style` 是地图样式的 `url`，或者你自己定义的 `style`（需遵循Mapbox样式规范），`center` 是地图加载后默认的中心点位置，用以定位地图加载时的位置。`zoom` `pitch` `bearing` 分别指缩放级别、地面法线偏移角、地轴偏移角等，用以确定当前视窗所显示的地图区域和空间关系。配置项的意义均可查看官网文档。

## 2. 绘制图形

这里主要介绍视频中的3D建筑、飞线动画等是如何实现的。这里以相关代码片段来介绍实践的方法。

在Mapbox中绘制图形时， `layer` 和 `source` 是最重要的一组概念，后者用于存储图形的数据内容，前者则是图形在3D场景中的表现（图层）。在Mapbox中，图层一旦被创建，与其同名（`id`相同）的数据源源（即`source`）也必然被创建。反之，也可以在创建source后再创建一个图层使用这个已创建的数据源，这时数据源与图层间并不要求同名。而我们通过改变数据来驱动图形变化，便是才去的第二种方式：

```js
// 创建id为buildings的数据源
myMap.addSource('buildings', {
 type: 'geojson',
 data: '<GeoJson Contents>',
});

// 使用buildings的数据来绘制id为building_layer的图形
myMap.addLayer({
  id: 'building_layer',
  type: 'fill-extrusion',
  source: 'buildings',
  ...<Other Options>,
});
```

基于上面的方式，当数据改变时，我们只需要重设数据源的数据，即可驱动图层重绘：

```js
if (myMap.getLayer('building_layer')) {
  myMap.getSource('buildings').setData(<New GeoJson Contents>);
}
```

至于3D效果及动画的具体实现，这里给出两个官网上的示例，相信大家能一目了然：

> i. [用3D形式呈现建筑](https://www.mapbox.com/mapbox-gl-js/example/3d-buildings/) 
> ii. [给路径中的一个点添加动画效果](https://www.mapbox.com/mapbox-gl-js/example/animate-point-along-route/)

## 3. 图形交互

Mapbox提供的交互方法是比较灵活的，活学活用API文档便能实现各种炫酷、实用的交互效果。比如：使用
 `myMap.on('zoom', callback)` 可以将图形与地图的缩放相绑定，当缩放系数小于某个值时，可以隐藏掉一些图形元素：

```js
myMap.on('zoom', () => {
  if (myMap.getZoom() <= 4) {
    myMap.setLayoutProperty('building_layer', 'visibility', 'none');
  } else {
    myMap.setLayoutProperty('building_layer', 'visibility', 'visible');
  }
});
```

再比如，连续调用 `myMap.flyTo()` 的方法使视图在地图上按照一定的轨迹缓慢移动，可以给用户一种模拟飞行的体验。视频中的自动巡视的效果正是这样实现的。

诸如 `click` `mouseover` `popup` 等效果，官网文档中的示例已经具体呈现，这里就不详细展开了。

## 4. tiles-server的本地化
由于 Mapbox 地图服务使用 MBTiles 存储数据，目前很多地图服务都接受了这套标准（如：OSM，Open Street Map）。所以可以通过搭建自己的 tiles-server 以替代直接使用 Mapbox 的在线地图服务。

这样做的好处是显而易见的：一是可以通过负载均衡等手段提高数据接口的访问速度，有效提高数据的加载速度；一是保障应用能在零带宽的环境下仍能有效部署和使用。

这里墙裂安利一个docker开源镜像：openmaptiles-server ，在其 [官网](https://openmaptiles.com/server/) 和 [dockerhub](https://hub.docker.com/r/klokantech/openmaptiles-server/) 上均可下载。个人认为其最大的亮点在于——即使不了解内部实现，也不影响其使用。

![openmaptiles.com](http://upload-images.jianshu.io/upload_images/590155-007937c011da1d09.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

运行 tiles-server 服务的 docker 命令如下：

```bash
$ docker run --rm -it -v $(pwd):/data -p 8080:80
```

然后剩下来需要做的事情就是打开其导航页面 [http://localhost:8080/](http://localhost:8080/)（端口号取决于你的启动命令），然后跟着页面上的提示一步一步设置就好了（最后一步设置后会从OSM走动下载地图，所以一开始你不用担心数据从哪来），完全是傻瓜式的部署。

# 四、性能调优
在 Mapbox GL 实践的过程中，发现了一些影响应用整体性能的因素，故而在此陈述一番，为之后填坑的童鞋提供一些经验：

1. 使用geo数据（如 GeoJson 格式数据）来定义图形的时候，若数据量过大，则会拖慢数据加载的速度，此时可考虑：

> i. 在 http 请求前后对数据进行合理的压缩和解压，以尽可能节省 http 请求传输的数据量；
> ii. 条件允许的情况下，可将一组数据分片加载，以空间换时间。

2. 在 Mapboox 中绘制的图层不宜过多，一是不方便管理（当然，github上有很多管理Mapbox图层的第三方工具），一是图层过多会明显降低GL的渲染和响应性能。所以在绘制图形前，可以先考虑一下图层的划分，以最少的图层实现尽可能多的效果。

3. 数据量相同的情况下，使用 `mapboxgl.Marker` 来添加标记，其性能不如使用 `type` 为 `symbol` 类型的图层来添加标记。原因在于前者生成的标记是一个个 DOM 元素，如果你可以想象在一个 web 页面中同时操作成百上千个 DOM 节点会是什么结果，那么你或许能明白我的建议。

# 五、一点总结
最后，在此总结下个人对 Mapbox 的一些感观。

Mapbox 的产品定位是随时随地的 GIS（跨平台、应用），它为我们提供了一系列的简单操作的 API，使得 GIS 开发变得灵活而有趣。尤其对于开发 GIS 类型的数据可视化应用，Mapbox 是绝佳的选择。

然而，如果你只是为了那些绚丽的 3D 效果的话，或许选择专门的框架更为合适。
