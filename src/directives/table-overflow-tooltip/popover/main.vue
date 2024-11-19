<template>
  <el-popover
    ref="popover"
    :reference="reference"
    placement="top"
    trigger="hover"
    :popper-class="`${darkClass} ${styles['popover']}`"
    @hook:mounted="removePopperClass"
    @show="removePopperClass"
    @hide="removePopperClass"
    @after-leave="onAfterLeave"
    @after-enter="onAfterEnter"
  >
    <div class="overflow-content">{{content}}</div>
  </el-popover>
</template>

<script>
import { Popover as ElPopover } from 'element-ui';
import 'element-ui/lib/theme-chalk/popover.css'
import styles from "./style.module.scss"

export default {
  name: 'Popover',
  components: {
    ElPopover,
  },
  props:{
    reference: {
      required: true,
      default: document.body,
      validator: val => val instanceof HTMLElement,
    },
    content: {
      type: [String, Number],
    },
    effect: {
      type: String,
      default: "dark",
      validator: val => ["light", "dark"].includes(val), 
    },
  },
  data(){
    return {
      styles,
    };
  },
  methods: {
    show(){
      this.$refs.popover.doShow()
    },
    close(){
      this.$refs.popover.doClose()
    },
    removePopperClass(){
      if(this.effect === "dark"){
        this.$nextTick(() => {
          // fix: when the effect is set to dark, quickly leaving and returning to the popover may sometimes cause the effect to change to light.
          this.$refs.popover.$refs.popper.classList.remove("el-popper")
        })
      }
    },
    onAfterLeave(){
      this.$emit("closed")
    },
    onAfterEnter(){
      this.removePopperClass()
      this.$emit("opened")
    },
  },
  watch: {
    
  },
  computed: {
    darkClass(){
      return this.effect === "dark" ? `is-${this.effect} el-tooltip__popper` : ""
    }
  },
  created() {
    
  },
  beforeDestroy(){
    this.close()
  },
  mounted() {
    this.show()
  },
}
</script>

<style scoped>

.overflow-content{
  white-space: initial;
  max-height: 50vh;
  max-width: 40vw;
  overflow: auto;
  padding: 8px 0;
  line-height: 1.2;
}

</style>