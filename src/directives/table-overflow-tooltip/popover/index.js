import Vue from 'vue'
import Main from './main.vue'

export const popover = ({ reference, content, effect }) => {
  let instance = null
  document.body.click()
  const el = document.createElement("span")
  const props = {
    reference,
    content,
    effect,
  }
  const on = {
    closed: () => {
      instance && instance.$destroy()
    },
    "hook:beforeDestroy": () => {
      instance && instance.$destroy()
      el.remove()
    },
  }
  instance = new Vue({
    el,
    render: h => h(Main, { props, on })
  })
  document.body.appendChild(el)
  return instance
}