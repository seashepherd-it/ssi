<template>
    <div>
        <h1>{{ msg }}</h1>
        <kendo-calendar :value="new Date()"></kendo-calendar>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({

  data () {
    return {
      msg: 'Hello Kendo UI for Vue.js'
    }
  }
});
</script>
