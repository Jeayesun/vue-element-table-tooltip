import {
  dark as darkTooltip,
  light as lightTooltip,
} from './directives/table-overflow-tooltip/index.js';

const install = function (Vue, options) {
  if (options && options.theme === 'light') {
    Vue.directive("element-table-tooltip", lightTooltip)
  } else {
    Vue.directive("element-table-tooltip", darkTooltip)
  }
}

export default install

export {
  darkTooltip,
  lightTooltip,
}