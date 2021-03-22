<template>
  <div class="wrapper">
    <div class="wrapper__container">
      <Viewport :activeAnimation="activeAnimation" :objects="objects"/>
      <div class="wrapper__configuration">
        <div>
          <label>Scale</label>
          <input v-model="scale"/>
        </div>
        <div>
          <label>X axis</label>
          <input v-model="xAxis"/>
        </div>
        <div>
          <label>Y axis</label>
          <input v-model="yAxis"/>
        </div>
        <div>
          <label>Z axis</label>
          <input v-model="zAxis"/>
        </div>
        <button @click="resetObjectPosition">RESET</button>
      </div>
    </div>
    <div class="wrapper__footer">
      <div class="wrapper__footer-part">
        <button @click="activateHorizontalAnimation">Horizontal</button>
        <button @click="activateVerticalAnimation">Vertically</button>
        <button @click="activateDiagonalAnimation">Diagonal</button>
        <button @click="activateEllipticalAnimation">Elliptical</button>
      </div>
      <div class="wrapper__footer-part">
        <button @click="spawnManyObjects" :disabled="disableSpawnClick">Spawn 50 objects</button>
        <button @click="appendObject">Append Nested Object</button>
        <button @click="clearObjects" :disabled="!disableSpawnClick && !nestedObjectsCount">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
import Viewport from "./viewport";
import Cylinder from '@/utils/Cylinder'
import Vue from 'vue'

export default {
  name: "first-laboratory",
  components: {Viewport},
  data() {
    return {
      objects: {},
      scale: 1,
      color: 'aqua',
      activeAnimation: null,
      direction: null,
      xAxis: 0,
      yAxis: 0,
      zAxis: 0,
      disableSpawnClick: false,
      nestedObjectsCount: 0
    }
  },
  watch: {
    scale() {
      this.objects.mainCylinder.scaleObject(this.$data.scale)
    },
    xAxis(value) {
      this.objects.mainCylinder.xPosition(value)
    },
    yAxis(value) {
      this.objects.mainCylinder.yPosition(value)
    },
    zAxis(value) {
      this.objects.mainCylinder.zPosition(value)
    },
    color(value) {
      this.objects.mainCylinder.color(value)
    }
  },
  mounted() {
    Vue.set(this.objects, 'mainCylinder', new Cylinder(
      {radiusTop: 1, radiusBottom: 1, height: 1.5, scale: this.scale, color: this.color}))
  },
  methods: {
    activateHorizontalAnimation() {
      this.resetObjectPosition()
      this.direction = null
      if (this.activeAnimation === this.horizontalMovement) {
        this.stopAnimation()
      } else {
        this.activeAnimation = this.horizontalMovement
      }
    },
    activateDiagonalAnimation() {
      this.resetObjectPosition()
      this.direction = null
      if (this.activeAnimation === this.diagonalMovement) {
        this.stopAnimation()
      } else {
        this.activeAnimation = this.diagonalMovement
      }
    },
    activateVerticalAnimation() {
      this.resetObjectPosition()
      this.direction = null
      if (this.activeAnimation === this.verticalMovement) {
        this.stopAnimation()
      } else {
        this.activeAnimation = this.verticalMovement
      }
    },
    activateEllipticalAnimation() {
      this.resetObjectPosition()
      this.direction = null
      if (this.activeAnimation === this.ellipticalMovement) {
        this.stopAnimation()
      } else {
        this.activeAnimation = this.ellipticalMovement
      }
    },
    horizontalMovement() {
      const {direction} = this.$data
      const {z} = this.objects.mainCylinder.object.position
      if (!direction) {
        this.direction = 'right'
      }
      if (Math.floor(z) >= 5) {
        this.direction = 'left'
      } else if (Math.floor(z) <= -5) {
        this.direction = 'right'
      }
      if (direction === 'right') {
        this.zAxis += 0.05
      } else if (direction === 'left') {
        this.zAxis -= 0.05
      }
    },
    verticalMovement() {
      const {direction} = this.$data
      const {y} = this.objects.mainCylinder.object.position
      if (!direction) {
        this.direction = 'up'
      }
      if (Math.floor(y) >= 3) {
        this.direction = 'down'
      } else if (Math.floor(y) <= -3) {
        this.direction = 'up'
      }
      if (direction === 'up') {
        this.yAxis += 0.05
      } else if (direction === 'down') {
        this.yAxis -= 0.05
      }
    },
    diagonalMovement() {
      const {direction} = this.$data
      const {y, z} = this.objects.mainCylinder.object.position
      if (!direction) {
        this.direction = 'up-right'
      }
      if (Math.ceil(z) >= 4 || Math.ceil(y) >= 4) {
        this.direction = 'down-left'
      } else if (Math.floor(z) <= -4 || Math.floor(y) <= -4) {
        this.direction = 'up-right'
      }
      if (direction === 'up-right') {
        this.zAxis += 0.04
        this.yAxis += 0.04
        if (Math.floor(y) < 0) {
          this.scale += 0.01
        } else {
          this.scale -= 0.01
        }
      } else if (direction === 'down-left') {
        this.zAxis -= 0.04
        this.yAxis -= 0.04
        if (Math.floor(y) < 0) {
          this.scale -= 0.01
        } else {
          this.scale += 0.01
        }
      }
    },
    ellipticalMovement() {
      const {direction} = this.$data
      const {z} = this.objects.mainCylinder.object.position
      if (!direction) {
        this.$data.direction = 'right'
      }
      if (Math.floor(z) >= 4) {
        this.$data.direction = 'left'
      } else if (Math.ceil(z) <= -4) {
        this.$data.direction = 'right'
      }

      if (direction === 'right') {
        this.$data.zAxis += 0.04
        if (Math.floor(z) < 0) {
          this.$data.yAxis -= 0.01
          this.$data.scale += 0.003
        } else {
          this.$data.yAxis += 0.01
          this.$data.scale -= 0.003
        }
      } else if (direction === 'left') {
        this.$data.zAxis -= 0.04
        if (Math.floor(z) < 0) {
          this.$data.yAxis -= 0.01
          this.$data.scale += 0.003
        } else {
          this.$data.yAxis += 0.01
          this.$data.scale -= 0.003
        }
      }
    },
    stopAnimation() {
      this.$data.activeAnimation = null
    },
    resetObjectPosition() {
      this.$data.xAxis = 0
      this.$data.yAxis = 0
      this.$data.zAxis = 0
      this.$data.scale = 1
    },
    spawnManyObjects() {
      for (let i = 1; i <= 25; i++) {
        const radius = this.getRandomArbitrary(0.2, 2) * 0.5
        const height = this.getRandomArbitrary(0.5, 3) * 0.5
        const cylinder = new Cylinder({radiusTop: radius, radiusBottom: radius, height, color: this.getRandomColor()})
        cylinder.xPosition(this.getRandomArbitrary(-15, 15))
        cylinder.yPosition(0)
        cylinder.zPosition(this.getRandomArbitrary(-15, 15))
        Vue.set(this.$data.objects, `cylinder${i}`, cylinder)
      }
      this.$data.disableSpawnClick = true
    },
    appendObject() {
      const parent = this.objects['nestedCylinder' + this.nestedObjectsCount] ?? this.objects.mainCylinder
      const {radiusTop, radiusBottom, height, scale} = parent.object.geometry.parameters

      this.nestedObjectsCount++
      const newRadiusTop = radiusTop / 1.5
      const newRadiusBottom = radiusBottom / 1.5
      const newHeight = height / 1.5
      const newScale = scale
      const nestedCylinder = new Cylinder(
        {
          radiusTop: newRadiusTop, radiusBottom: newRadiusBottom, height: newHeight,
          scale: newScale, color: this.getRandomColor()
        })
      Vue.set(this.$data.objects, `nestedCylinder${this.nestedObjectsCount}`, nestedCylinder)
    },
    clearObjects() {
      for (let i = 1; i <= 25; i++) {
        if (this.objects['cylinder' + i]) {
          Vue.delete(this.$data.objects, `cylinder${i}`)
        }
      }
      for (let i = 1; i <= this.$data.nestedObjectsCount; i++) {
        Vue.delete(this.$data.objects, `nestedCylinder${i}`)
      }
      this.$data.nestedObjectsCount = 0
      this.$data.disableSpawnClick = false
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
