import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class HemisphereLined {
  constructor({radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, color}) {
    const hemisphereGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    const hemisphereMaterial = new THREE.MeshBasicMaterial({
      color: 'transparent', side: THREE.DoubleSide, depthTest: true,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
    });
    const hemisphereMesh = new THREE.Mesh(hemisphereGeometry, hemisphereMaterial);

    const capGeometry = new THREE.CircleBufferGeometry(radius, widthSegments);
    capGeometry.rotateX(Math.PI * 0.5);
    const capMaterial = new THREE.MeshBasicMaterial({
      color: 'transparent', depthTest: true
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    hemisphereMesh.add(capMesh);

    const capLineMaterial = new THREE.LineBasicMaterial({
      color: 'black'
    });
    const capLinesMesh = new THREE.Line(capGeometry, capLineMaterial);
    hemisphereMesh.add(capLinesMesh);


    const edgesGeometry = new THREE.EdgesGeometry(hemisphereGeometry);
    const dashedMaterial = new THREE.LineDashedMaterial({
      color: color, scale: 1, dashSize: 0.5, gapSize: 0.3, depthTest: false,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
    });
    const dashedLines = new THREE.LineSegments(edgesGeometry, dashedMaterial);
    dashedLines.computeLineDistances();
    hemisphereMesh.add(dashedLines)

    const solidLinesMaterial = new THREE.LineBasicMaterial({
      color: color, depthTest: true,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
    });
    const solidLines = new THREE.LineSegments(edgesGeometry, solidLinesMaterial);
    solidLines.computeLineDistances();
    hemisphereMesh.add(solidLines)
    this.object = hemisphereMesh
  }
}

export class HemisphereDoted {
  constructor({radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, color}) {
    const hemisphereGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    const hemisphereMaterial = new THREE.MeshBasicMaterial({
      color: 'transparent', side: THREE.DoubleSide, depthTest: false,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
    });
    const hemisphereMesh = new THREE.Mesh(hemisphereGeometry, hemisphereMaterial);

    const pointsMaterial = new THREE.PointsMaterial({color, size: 0.1});
    const mainPoints = new THREE.Points(hemisphereGeometry, pointsMaterial);
    hemisphereMesh.add(mainPoints)

    const firstCapGeometry = new THREE.CircleBufferGeometry(radius / 3, widthSegments);
    const secondCapGeometry = new THREE.CircleBufferGeometry(radius / 2, widthSegments);
    const thirdCapGeometry = new THREE.CircleBufferGeometry(radius / 1.2, widthSegments);
    const fourthCapGeometry = new THREE.CircleBufferGeometry(radius / 1.5, widthSegments);
    const capGeometry = BufferGeometryUtils.mergeBufferGeometries(
      [firstCapGeometry, secondCapGeometry, thirdCapGeometry, fourthCapGeometry], false);
    capGeometry.rotateX(Math.PI * 0.5);

    const capPoints = new THREE.Points(capGeometry, pointsMaterial);
    hemisphereMesh.add(capPoints)

    this.object = hemisphereMesh
  }
}
