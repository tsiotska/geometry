<template>
  <div class="wrapper">
    <div class="wrapper__container">
      <Viewport :activeAnimation="activeAnimation" :objects="objects"/>
    </div>
    <div class="wrapper__footer">
      <div class="wrapper__footer-part">
        <button @click="activateRotationX">X ROTATION</button>
        <button @click="activateRotationY">Y ROTATION</button>
        <button @click="activateRotationZ">Z ROTATION</button>
      </div>
      <div class="wrapper__footer-part">
      </div>
    </div>
  </div>
</template>

<script>
import Viewport from "./viewport";
import Parallelepiped from '@/utils/Parallelepiped'
import Vue from "vue";

export default {
  name: "second-laboratory",
  components: {Viewport},
  data() {
    return {
      objects: {},
      color: 'aqua',
      activeAnimation: null,
      xRotationAngle: 0,
      yRotationAngle: 0,
      zRotationAngle: 0
    }
  },
  watch: {
    xRotationAngle(value) {
      this.objects.mainParallelepiped.xRotation(value)
    },
    yRotationAngle(value) {
      this.objects.mainParallelepiped.yRotation(value)
    },
    zRotationAngle(value) {
      this.objects.mainParallelepiped.zRotation(value)
    }
  },
  mounted() {
    Vue.set(this.objects, 'mainParallelepiped',
      new Parallelepiped({width: 10, height: 5, depth: 2, color: this.$data.color}))
  },
  methods: {
    activateRotationX() {
      this.resetObjectRotation()
      if (this.activeAnimation === this.xRotationAnimation) {
        this.stopAnimation()
      } else {
        this.$data.activeAnimation = this.xRotationAnimation
      }
    },
    activateRotationY() {
      this.resetObjectRotation()
      if (this.activeAnimation === this.yRotationAnimation) {
        this.stopAnimation()
      } else {
        this.$data.activeAnimation = this.yRotationAnimation
      }
    },
    activateRotationZ() {
      this.resetObjectRotation()
      if (this.activeAnimation === this.zRotationAnimation) {
        this.stopAnimation()
      } else {
        this.$data.activeAnimation = this.zRotationAnimation
      }
    },
    xRotationAnimation() {
      this.xRotationAngle += 0.01
    },
    yRotationAnimation() {
      this.yRotationAngle += 0.01
    },
    zRotationAnimation() {
      this.zRotationAngle += 0.01
    },
    stopAnimation() {
      this.$data.activeAnimation = null
    },
    resetObjectRotation() {
      this.xRotationAngle = 0
      this.yRotationAngle = 0
      this.zRotationAngle = 0
    },
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
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

.wrapper__footer {
  display: flex;
}

.wrapper__footer-part:not(:first-child) {
  margin-left: 100px;
}
</style>
