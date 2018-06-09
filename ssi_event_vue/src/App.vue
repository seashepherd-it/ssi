<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">

import Vue from "vue"

import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'

import { Calendar, 
         DateinputsInstaller, } from '@progress/kendo-dateinputs-vue-wrapper'

import { DataSource,
        HierarchicalDataSource,
        GanttDataSource,
        GanttDependencyDataSource,
        PivotDataSource,
        SchedulerDataSource,
        TreeListDataSource,
        DataSourceInstaller} from '@progress/kendo-datasource-vue-wrapper'

import { Spreadsheet,
         SpreadsheetSheet,
         SpreadsheetInstaller } from '@progress/kendo-spreadsheet-vue-wrapper'

import { Scheduler,
         SchedulerResource,
         SchedulerView,
         SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper'

Vue.use(DateinputsInstaller);
Vue.use(SpreadsheetInstaller)
Vue.use(DataSourceInstaller);
Vue.use(SchedulerInstaller)

export default {
  name: "App",
  data: { name: "World" },
  components: {
    Calendar,
    Spreadsheet,
    SpreadsheetSheet,
    Scheduler
  }
};
</script>

<style>
</style>
