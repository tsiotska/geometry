import * as THREE from 'three';

class Parallelepiped {
  constructor({color, width, height, depth}) {
    const boxGeometry = new THREE.BoxBufferGeometry(width, height, depth)
    const boxMaterial = new THREE.MeshBasicMaterial({
      color: 'transparent', side: THREE.DoubleSide, depthTest: true,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);


    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
    const dashedMaterial = new THREE.LineDashedMaterial({
      color: color, scale: 1, dashSize: 0.5, gapSize: 0.3, depthTest: false,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
    });
    const dashedLines = new THREE.LineSegments(edgesGeometry, dashedMaterial);
    dashedLines.computeLineDistances();
    boxMesh.add(dashedLines)

    const solidLinesMaterial = new THREE.LineBasicMaterial({
      color: color, depthTest: true,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
    });
    const solidLines = new THREE.LineSegments(edgesGeometry, solidLinesMaterial);
    solidLines.computeLineDistances();
    boxMesh.add(solidLines)
    boxMesh.rotation.y = 360
    this.object = boxMesh
  }

  xRotation(value) {
    this.object.rotation.x = value
  }

  yRotation(value) {
    this.object.rotation.y = value
  }

  zRotation(value) {
    this.object.rotation.z = value
  }
}

export default Parallelepiped
