import { popover } from './popover/index.js'

const directive = (theme) => {
  let instance = null
  const map = new WeakMap()
  const update = (el, binding, vnode, oldVnode) => {
    const table = vnode.componentInstance.$parent
    map.set(table, new AbortController())
    if (binding.value === undefined || !!binding.value === true) {
      if (map.has(table)) {
        const controller = map.get(table)
        controller && controller.abort() // destroy old eventListenner
        map.set(table, new AbortController())
      }
      instance && instance.$destroy()
      instance = null
      vnode.componentInstance.$nextTick(() => {
        const columnId = vnode.componentInstance.columnId
        table.$on("hook:deactivated", () => {
          instance && instance.$destroy()
          instance = null
        })
        table.$on("hook:destroyed", () => {
          const controller = map.get(table)
          controller && controller.abort()
          instance && instance.$destroy()
          instance = null
          map.delete(table)
        })
        if (columnId && map.has(table)) {
          const controller = map.get(table)
          const cells = table.$el.querySelectorAll(`tbody td.${columnId} .cell`)
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
              if (rangeWidth + padding > cell.offsetWidth || cell.scrollWidth > cell.offsetWidth) {
                instance && instance.$destroy()
                instance = null
                instance = popover({
                  effect: binding.arg || theme,
                  reference: cell,
                  content: cell.innerText,
                })
              }
            }, { signal: controller.signal })
          }
        }
      })
    }
  }
  const unbind = () => {
    instance && instance.$destroy()
    instance = null
  }
  return {
    bind: update,
    update,
    unbind,
  }
}

export default directive("dark")

export const dark = directive("dark")

export const light = directive("light")