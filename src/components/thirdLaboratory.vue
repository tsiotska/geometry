<template>
  <div class="wrapper">
    <div class="wrapper__container">
      <Viewport :objects="objects"/>
    </div>
    <div class="wrapper__footer">
      <div class="wrapper__footer-part">
        <button @click="toggleMode">Toggle</button>
      </div>
    </div>
  </div>
</template>

<script>
import Viewport from "./viewport";
import { HemisphereDoted, HemisphereLined } from '@/utils/Hemisphere'
import Vue from "vue";

export default {
  name: "thirdLaboratory",
  components: {Viewport},
  data() {
    return {
      objects: {},
      color: 'aqua',
      currentHemisphere: 'doted'
    }
  },
  mounted() {
    Vue.set(this.$data.objects, 'mainHemisphere',
      new HemisphereDoted(
        {
          radius: 5,
          widthSegments: 15,
          heightSegments: 16,
          phiStart: 3 * Math.PI,
          phiLength: 2 * Math.PI,
          thetaStart: 0,
          thetaLength: 0.5 * Math.PI,
          color: this.color
        }))
  },
  watch: {
    currentHemisphere: {
      handler(type) {
        console.log(type);
        if (type === 'lined') {
          if (this.$data.objects.dotedHemisphere) {
            Vue.delete(this.$data.objects, 'dotedHemisphere')
          }
          Vue.set(this.$data.objects, 'linedHemisphere',
            new HemisphereLined(
              {
                radius: 5,
                widthSegments: 15,
                heightSegments: 16,
                phiStart: 3 * Math.PI,
                phiLength: 2 * Math.PI,
                thetaStart: 0,
                thetaLength: 0.5 * Math.PI,
                color: this.color
              }))
        } else {
          if (this.$data.objects.linedHemisphere) {
            Vue.delete(this.$data.objects, 'linedHemisphere')
          }
          Vue.set(this.$data.objects, 'dotedHemisphere',
            new HemisphereDoted(
              {
                radius: 5,
                widthSegments: 15,
                heightSegments: 16,
                phiStart: 3 * Math.PI,
                phiLength: 2 * Math.PI,
                thetaStart: 0,
                thetaLength: 0.5 * Math.PI,
                color: this.color
              }))
        }
      }
    }
  },
  methods: {
    toggleMode() {
      if (this.$data.currentHemisphere !== 'lined') {
        this.$data.currentHemisphere = 'lined'
      } else {
        this.$data.currentHemisphere = 'doted'
      }
    }
  }
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
