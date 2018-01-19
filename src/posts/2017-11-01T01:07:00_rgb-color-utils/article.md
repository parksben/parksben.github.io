===

标题: rgb-color-utils 又一个前端RGB颜色小工具
标签: 前端, npm包, 工具

===

[项目git仓库](https://github.com/parksben/rgb-color-utils)

A simple utils library for RGB colors which provides some convenient methods such as color interpolation, gradient generation, etc.

## Installation
```
npm install rgb-color-utils
```
or

```
yarn add rgb-color-utils
```

## Example Usage

```js
import { parseColor, interpolate, gradientColor } from 'rgb-color-utils';

const colorList = parseColor('#cdab85'); // [205, 171, 133]
const newColor = interpolate('rgb(0, 23, 148)', '#febab5', 0.5); // '#7f69a5'
const colorMap = gradientColor('#bca380', '#00f', 4); // ['#bca380', '#8d7aa0', '#5e52c0', '#2f29df']
```

## API

### parseColor(color)

- `color` one RGB/HEX color string (`rgb(0, 23, 148)` or `#bf0081`)

### interpolate(from, to, step)

- `from` the starting position RGB/HEX color string (`rgb(0, 23, 148)` or `#bf0081`)
- `to` the end position color string
- `step` the normalized value (between 0 and 1) of the interpolation. A step of `0.5` would be the middle of `from` and `to`

### gradientColor(from, to, length)

- `from` the starting position RGB/HEX color string (`rgb(0, 23, 148)` or `#bf0081`)
- `to` the end position color string
- `length ` the length of the gradient colors array.

## License

MIT License
