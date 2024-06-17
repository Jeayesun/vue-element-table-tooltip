<template>
  <el-popover
    ref="popover"
    :reference="reference"
    placement="top"
    trigger="hover"
    @show="onShow"
    @after-leave="onAfterLeave"
    @after-enter="onAfterEnter"
  >
    <div class="overflow-content">{{content}}</div>
  </el-popover>
</template>

<script>
import { Popover as ElPopover } from 'element-ui';
import 'element-ui/lib/theme-chalk/popover.css'

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
      
    };
  },
  methods: {
    show(){
      this.$refs.popover.doShow()
    },
    close(){
      this.$refs.popover.doClose()
    },
    onShow(){
      const popover = this.$refs.popover.$refs.popper
      popover.style.padding = "0 12px"
      popover.style.minWidth = 0
      if (this.effect === "dark") {
        popover.classList.remove("el-popper")
        popover.classList.add("is-dark")
        popover.classList.add("el-tooltip__popper")
        popover.style.borderWidth = 0
      }
    },
    onAfterLeave(){
      this.$emit("closed")
    },
    onAfterEnter(){
      this.$emit("opened")
    },
  },
  watch: {
    
  },
  computed: {
    
  },
  created() {
    
  },
  mounted() {
    this.$nextTick(() => {
      this.show()
    })
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