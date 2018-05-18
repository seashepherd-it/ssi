<template>
  <div class="fixed-center text-center">
    <img src="~assets/hqdefault.jpg" class="align-center">    
    <h1>{{ msg }}</h1>    
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      msg: "Hello!!!"
    };
  }
};
</script>