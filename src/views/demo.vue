<template>
  <div class="wrapper">
    <el-table
      :data="tableData"
    >
      <el-table-column
        label="overflow"
        prop="column1"
        v-element-table-tooltip:light
      ></el-table-column>
      <el-table-column
        label="overflow"
        prop="column2"
        v-element-table-tooltip
      ></el-table-column>
      <el-table-column
        label="overflow"
        prop="column3"
        v-element-table-tooltip
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
} from 'element-ui'
import  { darkTooltip, lightTooltip } from '@/index.js'
import 'element-ui/lib/theme-chalk/table.css'
import 'element-ui/lib/theme-chalk/table-column.css'

export default {
  name: 'Demo',
  directives: {
    "element-table-tooltip": darkTooltip,
  },
  components: {
    ElTable,
    ElTableColumn,
  },
  data() {
    return {
      tableData: [{
        column1: "overflowTextoverflowTextoverflowTextoverflowTextoverflowTextoverflowText",
        column2: "overflowTextoverflowTextoverflowTextoverflowTextoverflowTextoverflowText",
        column3: "overflowTextoverflowTextoverflowTextoverflowTextoverflowTextoverflowText",
      }, {
        column1: "overflowTextoverflowTextoverflowTextoverflowTextoverflowTextoverflowText",
        column2: "overflowTextoverflowTextoverflowTextoverflowTextoverflowTextoverflowText",
        column3: "overflowTextoverflowTextoverflowTextoverflowTextoverflowTextoverflowText",
      },]
    }
  },
}
</script>

<style scoped>
.wrapper{
  height: 100%;
  width: 100%;
}
</style>