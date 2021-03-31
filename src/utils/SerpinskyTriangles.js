import * as THREE from "three";

export default class SerpinskyTriangles {
  constructor({points, depth}) {
    this.drawFract(points, depth)
  }

  drawTriangle(points) {
    const vectors = points.map(({z, y}) => {
      return new THREE.Vector3(0, y, z)
    })
    vectors.push(new THREE.Vector3(0, points[0].y, points[0].z))

    const geometry = new THREE.BufferGeometry().setFromPoints(vectors);
    const material = new THREE.LineBasicMaterial({color: this.getRandomColor()});
    const line = new THREE.Line(geometry, material);

    this.object = this.object?.add(line) || line
  }

  drawFract(points, depth) {
    if (depth > 0) {
      const pA = {
          z: (points[0].z + points[1].z) / 2,
          y: (points[0].y + points[1].y) / 2
        },
        pB = {
          z: (points[1].z + points[2].z) / 2,
          y: (points[1].y + points[2].y) / 2
        },
        pC = {
          z: (points[2].z + points[0].z) / 2,
          y: (points[2].y + points[0].y) / 2
        };

      this.drawFract([points[0], pA, pC], depth - 1)
      this.drawFract([pA, points[1], pB], depth - 1)
      this.drawFract([pC, pB, points[2]], depth - 1)
      this.drawTriangle(points)
    } else {
      this.drawTriangle(points)
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
