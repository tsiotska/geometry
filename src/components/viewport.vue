<template>
  <div class="wrapper">
    <div class="wrapper__container">
      <div class="wrapper__viewport" ref="viewport"></div>
    </div>
  </div>
</template>

<script>
import { renderConfiguration } from '@/utils/RenderMixin'

export default {
  name: "Viewport",
  mixins: [renderConfiguration],
  props: {
    objects: Object,
    activeAnimation: Function
  },
  watch: {
    objects: {
      handler(objects) {
        this.removeAllObjects()
        Object.values(objects).forEach(({object}) => {
          this.scene.add(object)
        })
        this.start()
      },
    }
  },
  methods: {
    removeAllObjects() {
      for (let i = this.scene.children.length -1; i >= 0; i--) {
        let obj = this.scene.children[i];
        console.log(i);
        console.log(obj);
        if (obj.type !== 'PerspectiveCamera') {
          this.scene.remove(obj);
        }
      }
      console.log('finish');
      console.log(this.scene.children);
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.wrapper__viewport {
  width: 95%;
  height: 85%;
}

.wrapper__container {
  display: flex;
  height: 100%;
}
</style>
