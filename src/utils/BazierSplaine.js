import * as THREE from 'three';

class BazierSplaine {
  constructor() {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector2( -10, 0 ),
      new THREE.Vector2( -5, 5 ),
      new THREE.Vector2( 0, 0 ),
      new THREE.Vector2( 5, -5 ),
     );
    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 0xfff000 } );
    const curveObject = new THREE.Line( geometry, material );
    curveObject.rotation.y = 360
    this.object = curveObject
  }
}

export default BazierSplaine
