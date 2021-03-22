import * as THREE from 'three';
import { Scene } from 'three';
import OrbitControls from 'three-orbitcontrols';

export const renderConfiguration = {
   mounted() {
      this.width = this.$refs.viewport.clientWidth;
      this.height = this.$refs.viewport.clientHeight;
      this.scene = new Scene();
      this.configureRenderer();
      this.setCamera();
      this.setLight();
      this.setControls();
   },

   methods: {
      setCamera() {
         this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 9999);
         this.camera.position.x = -10;
         this.camera.position.y = 0;
         this.camera.position.z = 0;
      },
      configureRenderer() {
         this.renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
         this.renderer.physicallyCorrectLights = true;
         this.renderer.gammaInput = true;
         this.renderer.gammaOutput = true;
         this.renderer.shadowMap.enabled = true;
         this.renderer.toneMapping = THREE.ReinhardToneMapping;
         this.renderer.setClearColor(0xdbdada, 1);
         this.renderer.setPixelRatio(window.devicePixelRatio);
         this.renderer.setSize(this.width, this.height);
         this.$refs.viewport.appendChild(this.renderer.domElement);
      },
      setControls() {
         this.controls = new OrbitControls(this.camera, this.renderer.domElement);
         this.controls.target.set(0,0,0)
         this.controls.enableDamping = true;
         this.controls.campingFactor = 0.001;
         this.controls.enableZoom = true;
         this.controls.minDistance = 1;
         this.controls.maxDistance = 15;

      },
      setLight() {
         // const light = new THREE.AmbientLight(0xffffff, 0.1);
         // const light = new THREE.HemisphereLight(0xd90368, 0x64a6bd, 2);
         const frontLight = new THREE.DirectionalLight(0xffffff, 0.2);
         this.camera.add(frontLight);
         this.scene.add(this.camera);
      },

      animate() {
         if (typeof this.activeAnimation === 'function') {
            this.activeAnimation()
         }
         this.renderScene();
         this.frameId = window.requestAnimationFrame(this.animate)
      },
      start() {
         if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
         }
      },
      stop() {
         cancelAnimationFrame(this.frameId);
         this.frameId = false;
      },

      renderScene() {
         this.renderer.render(this.scene, this.camera)
      },
   }
}
