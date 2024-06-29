中文 | [English](./README.md)

在element ui的表格组件中，当表格内容超过列宽后，可以使用show-overflow-tooltip属性设置悬浮内容，但是当鼠标移入到悬浮窗时，悬浮窗却直接消失，从而导致超过列宽的内容无法复制。element官方表示没有修复此问题的计划（[el-table component adds show-overflow-tooltip, and text in tooltip cannot be copied by mouse selection](https://github.com/ElemeFE/element/issues/13916)），但是实际上产品又确确实实有这个需求，因此我们可以使用vue-element-table-tooltip来解决这个问题。

安装vue-element-table-tooltip

```bash
npm install --save vue-element-table-tooltip
```
在main.js中引入

```javascript
import elementTableTooltip from "vue-element-table-tooltip";

Vue.use(elementTableTooltip, {
  theme: "dark", // dark | light
  name: "element-table-tooltip", // 配置指令的具体名称。若不指定指令名称，element-table-tooltip为默认指令名
});
```
如果只在组件中部分使用

```javascript
import { darkTooltip, lightTooltip } from 'vue-element-table-tooltip'

export default {
	...
	directives: {
    "element-table-tooltip": darkTooltip,
  },
  ...
}
```
在table组件中使用

```html
<el-table-column
  label="overflow"
  prop="column2"
  v-element-table-tooltip
></el-table-column>
```
如果需要临时禁用tooltip，将绑定值设为false即可。false可以替换为判定表达式。
```html
<el-table-column
  label="overflow"
  prop="column2"
  v-element-table-tooltip="false"
></el-table-column>
```
另外，tooltip可以单独设置主题，如下所示：
```html
<el-table-column
  label="overflow"
  prop="column2"
  v-element-table-tooltip:dark
></el-table-column>
<el-table-column
  label="overflow"
  prop="column2"
  v-element-table-tooltip:light
></el-table-column>
```
仓库地址：[vue-element-table-tooltip](https://github.com/chiawiansup/vue-element-table-tooltip#readme)