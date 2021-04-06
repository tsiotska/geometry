import * as THREE from "three";

export default class KochSnowflake {
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
          z: (points[1].z - points[0].z) / 3 + points[0].z,
          y: (points[1].y - points[0].y) / 3 + points[0].y,
        },
        pB = {
          z: (points[1].z - points[0].z) * 2 / 3 + points[0].z,
          y: (points[1].y - points[0].y) * 2 / 3 + points[0].y,
        },
        pC = {
          z: (points[1].z - points[0].z) / 2 + points[0].z,
          y: (points[1].y - points[0].y) / 2  + points[0].y * 2,
        };

      const p2A = {
          z: points[1].z,
          y: (points[2].y - points[1].y) * 2 / 3 + points[1].y
        },
        p2B = {
          z: (points[2].z - points[1].z) / 3 + points[1].z,
          y: (points[2].y - points[1].y) / 3 + points[1].y,
        },
        p2C = {
          z: (points[2].z - points[1].z) * 2 / 3 + points[1].z,
          y: (points[2].y - points[1].y) * 2 / 3 + points[1].y,
        };

      const p3A = {
          z: points[0].z,
          y: (points[2].y - points[0].y) * 2 / 3 + points[0].y
        },
        p3B = {
          z: (points[2].z - points[0].z) / 3 + points[0].z,
          y: (points[2].y - points[0].y) / 3 + points[0].y,
        },
        p3C = {
          z: (points[2].z - points[0].z) * 2 / 3 + points[0].z,
          y: (points[2].y - points[0].y) * 2 / 3 + points[0].y,
        };

      this.drawFract([pA, pB, pC], depth - 1)
      this.drawFract([p2A, p2B, p2C], depth - 1)
      this.drawFract([p3A, p3B, p3C], depth - 1)
      this.drawTriangle(points)
    } else {
      //  this.drawTriangle(points)
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
