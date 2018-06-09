<template>
    <div>
        <h1>{{ msg }}</h1>
          <kendo-schedulerdatasource ref="schedulerdatasource1"
                                    :batch="true"
                                    transport-read-url="https://demos.telerik.com/kendo-ui/service/tasks"
                                    transport-read-data-type="jsonp"
                                    transport-update-url="https://demos.telerik.com/kendo-ui/service/tasks/update"
                                    transport-update-data-type="jsonp"
                                    transport-create-url="https://demos.telerik.com/kendo-ui/service/tasks/create"
                                    transport-create-data-type="jsonp"
                                    transport-destroy-url="https://demos.telerik.com/kendo-ui/service/tasks/destroy"
                                    transport-destroy-data-type="jsonp"
                                    :transport-parameter-map="parameterMap"
                                    schema-model-id="taskId"
                                    :schema-model-fields="fields"
                                    :filter-logic="'or'"
                                    :filter-filters="filters">
          </kendo-schedulerdatasource>

          <kendo-scheduler data-source-ref="schedulerdatasource1"
                          :date="date"
                          :startTime="startTime"
                          :height="600"
                          :timezone="'Etc/UTC'">
              <kendo-scheduler-view :type="'day'"></kendo-scheduler-view>
              <kendo-scheduler-view :type="'workWeek'" :selected="true"></kendo-scheduler-view>
              <kendo-scheduler-view :type="'week'"></kendo-scheduler-view>
              <kendo-scheduler-view :type="'month'"></kendo-scheduler-view>
              <kendo-scheduler-view :type="'agenda'"></kendo-scheduler-view>
              <kendo-scheduler-resource :field="'ownerId'" :title="'Owner'" :data-source="resourceDataSource"></kendo-scheduler-resource>
          </kendo-scheduler>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({

  data() {
    return {
      msg: '',
      date: new Date('2013/6/13'),
      startTime: new Date('2013/6/13 07:00 AM'),
      resourceDataSource: [
          { text: 'Alex', value: 1, color: '#f8a398' },
          { text: 'Bob', value: 2, color: '#51a0ed' },
          { text: 'Charlie', value: 3, color: '#56ca85' }
      ],
      fields: {
          taskId: { from: 'TaskID', type: 'number' },
          title: { from: 'Title', defaultValue: 'No title', validation: { required: true } },
          start: { type: 'date', from: 'Start' },
          end: { type: 'date', from: 'End' },
          startTimezone: { from: 'StartTimezone' },
          endTimezone: { from: 'EndTimezone' },
          description: { from: 'Description' },
          recurrenceId: { from: 'RecurrenceID' },
          recurrenceRule: { from: 'RecurrenceRule' },
          recurrenceException: { from: 'RecurrenceException' },
          ownerId: { from: 'OwnerID', defaultValue: 1 },
          isAllDay: { type: 'boolean', from: 'IsAllDay' }
      },
      filters: [
          { field: 'ownerId', operator: 'eq', value: 1 },
          { field: 'ownerId', operator: 'eq', value: 2 }
      ]
    }
  },
  methods: {
    parameterMap: function (options: any, operation: any) {
      if (operation !== 'read' && options.models) {
        return {models: kendo.stringify(options.models)}
      }
    },
    change: function (e: any) {
//            var checked = kendo.jQuery.map(kendo.jQuery('#people :checked'), function (checkbox) {
//                return parseInt(kendo.jQuery(checkbox).val())
//            })
//            var scheduler = kendo.jQuery('#scheduler').data('kendoScheduler')
//            scheduler.dataSource.filter({
//                operator: function (task) {
      alert('fnz435jhgewr34g5g34')
//                }
//            })
      return 1
    }
  }
});
</script>
