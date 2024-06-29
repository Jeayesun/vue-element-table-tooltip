English | [中文](./README-zh.md)

# vue-element-table-tooltip

A vue directive for element-ui to fix this issue: [[Bug Report] el-table component adds show-overflow-tooltip, and text in tooltip cannot be copied by mouse selection](https://github.com/ElemeFE/element/issues/13916)

Since there is no plan to support copying overflow content in element-ui table components, and this requirement does exist, we could solve it with vue directive api.

# install

```bash
npm install --save vue-element-table-tooltip
```

or

```bash
yarn add vue-element-table-tooltip
```

## how to use

Import it in `main.js`, and configure the theme and the directive name. If theme is not provided, dark is default. If directive name if not provided, `element-table-tooltip` is default.

```js
import elementTableTooltip from "vue-element-table-tooltip";

Vue.use(elementTableTooltip, {
  theme: "dark", // dark | light
  name: "element-table-tooltip",
});
```

If you wanna use it in `.vue` partially, import and register it.

```js
import { darkTooltip, lightTooltip } from 'vue-element-table-tooltip'

export default {
	...
	directives: {
    "element-table-tooltip": darkTooltip,
  },
  ...
}
```

And then replace `show-overflow-tooltip` attribute with `v-element-table-tooltip` directive at `el-table-column` component where you wanna show overflow tooltips.

```html
<el-table-column
  label="overflow"
  prop="column2"
  v-element-table-tooltip
></el-table-column>
```

If you wanna disable tooltip，it goes like this:

```html
<el-table-column
  label="overflow"
  prop="column2"
  v-element-table-tooltip="false"
></el-table-column>
```

In addition, theme parameter is supported. It will ignore theme option which defined before.

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

Happy coding.
