import * as THREE from 'three';

class Cylinder {
   constructor({color, radiusTop, radiusBottom, height, scale = 1}) {
      // Створюємо призму і кастомізуємо як похилу
      const cylinderGeometry = new THREE.CylinderBufferGeometry(radiusTop * scale, radiusBottom * scale, height * scale, 5, 1, false)
      const vertices = cylinderGeometry.attributes.position;
      const v3 = new THREE.Vector3();
      // пошук максимальної вершини
      let highVertex = -9999;
      for (let i = 0; i < vertices.count; i++) {
         v3.fromBufferAttribute(vertices, i);
         if (v3.y > highVertex) {
            highVertex = v3.y
         }
      }
      // зміщення вершини
      for (let i = 0; i < vertices.count; i++) {
         v3.fromBufferAttribute(vertices, i);
         if (v3.y === highVertex) {
            v3.z = v3.z + 1
            vertices.setZ(i, v3.z);
         }
      }

      const cylinderMaterial = new THREE.MeshLambertMaterial({
         color: color
      });
      const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      // Проводка, лінії каркасу
      const wireframeGeometry = new THREE.WireframeGeometry(cylinderGeometry);
      const wireMaterial = new THREE.LineBasicMaterial({})
      const wireframes = new THREE.LineSegments(wireframeGeometry, wireMaterial);
      wireframes.material.depthTest = false;
      wireframes.material.opacity = 0.25;
      wireframes.material.transparent = true;

      cylinderMesh.add(wireframes);
      this.object = cylinderMesh
   }

   scaleObject(scale) {
      this.object.scale.set(scale, scale, scale);
   }

   zPosition(value) {
      this.object.position.z = value
   }

   yPosition(value) {
      this.object.position.y = value
   }

   xPosition(value) {
      this.object.position.x = value
   }
}

export default Cylinder
