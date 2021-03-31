<template>
  <div class="wrapper">
    <div class="wrapper__container">
      <Viewport :objects="objects"/>
    </div>
  </div>
</template>

<script>
import Viewport from "./viewport";
import BSplaine from '@/utils/BSplaine'
import BazierSplaine from '@/utils/BazierSplaine'
import Vue from "vue";

export default {
  name: "thirdLaboratory",
  components: {Viewport},
  data() {
    return {
      objects: {},
      color: 'aqua',
      points: [{x: 0.5, y: 72}, {x: 0.95, y: 120}, {x: 1.4, y: 65}, {x: 1.85, y: 24}, {x: 2.3, y: 49}]
    }
  },
  mounted() {
    Vue.set(this.objects, 'mainBSplaine', new BSplaine({points: this.$data.points}))
    Vue.set(this.objects, 'bazierSplaine', new BazierSplaine({points: this.$data.points}))
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
