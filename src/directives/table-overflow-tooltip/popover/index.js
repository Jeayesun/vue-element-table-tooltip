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
      if (instance) {
        instance.$destroy()
      }
    },
    "hook:destroyed": () => {
      el.remove()
    },
  }
  instance = new Vue({
    el,
    render: h => h(Main, { props, on })
  })
  instance.$on("hook:destroyed", () => {
    el.remove()
  })
  document.body.appendChild(el)
  return instance
}