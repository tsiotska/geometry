<template>
  <div class="wrapper">
    <div class="wrapper__container">
      <Viewport :objects="objects"/>
    </div>
  </div>
</template>

<script>
import Viewport from "./viewport";
import KochSnowflake from '../utils/KochSnowflake'
import Vue from "vue";

export default {
  name: "seventhLaboratory",
  components: {Viewport},
  data() {
    return {
      objects: {},
      color: 'aqua',
    }
  },
  mounted() {
    Vue.set(
      this.$data.objects,
      'kochSnowflake',
      new KochSnowflake({points: [{z: -5, y: -2.5}, {z: 5, y: -2.5}, {z: 0, y: 5}], depth: 2})
    )
  },
  methods: {}
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.wrapper__container {
  display: flex;
  height: 100%;
}
</style>
