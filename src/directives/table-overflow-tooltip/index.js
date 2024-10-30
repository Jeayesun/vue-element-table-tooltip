import { popover } from './popover/index.js'

const directive = theme => {
  const map = new WeakMap()
  const update = (el, binding, vnode, oldVnode) => {
    const table = vnode.componentInstance.$parent
    // for grouping table head
    const getTableInstance = () => {
      let parent = table;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent
    }
    if (map.has(table)) {
      const item = map.get(table)
      item.controller && item.controller.abort() // destroy old eventListenner
      item.popover && item.popover.$destroy() // destroy old popover
    }
    map.set(table, {
      controller: new AbortController(),
      popover: null,
    })
    if (binding.value === undefined || !!binding.value === true) {
      vnode.componentInstance.$nextTick(() => {
        const columnId = vnode.componentInstance.columnId
        let isActive = true
        const item = map.get(table)
        table.$on("hook:deactivated", () => {
          isActive = false
          item.popover && item.popover.$destroy()
          item.popover = null
        })
        table.$on("hook:activated", () => isActive = true)
        table.$on("hook:beforeDestroy", () => {
          item.controller && item.controller.abort()
          item.popover && item.popover.$destroy()
          item.popover = null
          map.delete(table)
        })
        if (columnId && map.has(table)) {
          const cells = getTableInstance(table).$el.querySelectorAll(`tbody td.${columnId} .cell`)
          for (const cell of cells) {
            cell.style.overflow = "hidden"
            cell.style.whiteSpace = "nowrap"
            cell.style.textOverflow = "ellipsis"
            cell.style.wordBreak = "break-all"
            cell.addEventListener("mouseenter", () => {
              const range = document.createRange();
              range.setStart(cell, 0);
              range.setEnd(cell, cell.childNodes.length);
              const rangeWidth = range.getBoundingClientRect().width;
              const paddingLeft = window.getComputedStyle(cell).paddingLeft.replace("px", "")
              const paddingRight = window.getComputedStyle(cell).paddingRight.replace("px", "")
              const padding = parseInt(paddingLeft) + parseInt(paddingRight)
              if (isActive && (rangeWidth + padding > cell.offsetWidth || cell.scrollWidth > cell.offsetWidth)) {
                item.popover && item.popover.$destroy()
                item.popover = popover({
                  effect: binding.arg || theme,
                  reference: cell,
                  content: cell.innerText,
                })
              }
            }, { signal: item.controller.signal })
          }
        }
      })
    }
  }
  return {
    bind: update,
    update,
  }
}

export default directive("dark")

export const dark = directive("dark")

export const light = directive("light")