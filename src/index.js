import {
  dark as darkTooltip,
  light as lightTooltip,
} from './directives/table-overflow-tooltip/index.js';

const install = function (Vue, options) {
  const name = options && options.name || "element-table-tooltip"
  if (options && options.theme === 'light') {
    Vue.directive(name, lightTooltip)
  } else {
    Vue.directive(name, darkTooltip)
  }
}

export {
  install as default,
  darkTooltip,
  lightTooltip,
}