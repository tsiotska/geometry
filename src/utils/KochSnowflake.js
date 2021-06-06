import * as THREE from "three";

export default class KochSnowflake {
  constructor({/*points,*/ depth}) {
    this.SNOWFLAKE_ITERATIONS = depth
    this.SNOWFLAKE_SIZE = 3;
    this.SNOWFLAKE_CHILD_SCALE = 1 / 3;
    const t1Side = this.SNOWFLAKE_SIZE;
    const t2Side = t1Side * this.SNOWFLAKE_CHILD_SCALE;

    const t1Height = this.triangleHeight(t1Side);
    const t2Height = this.triangleHeight(t2Side);

    const snowFlakeHeight = t1Height + t2Height;
    const base = new Point(5.0, t2Height - snowFlakeHeight / 2);

    const t1Dir = new Point(0.0, 0.0);
    //const t2Dir = new Point(0.0, -1.0);

    this.drawFract(base, t1Dir, t1Side, this.SNOWFLAKE_ITERATIONS);
    // this.drawFract(base, t2Dir, t2Side, this.SNOWFLAKE_ITERATIONS - 1);
  }

  drawFract(base, dir, side, iterations) {
    const triangle = this.calcTriangle(base, dir, side);
    console.log('triangle');
    console.log(triangle);


    if (iterations === 1) {
      this.drawTriangle(triangle)
    } else {
      const leftVert = new Point(triangle[0].z, triangle[0].y);
      const rightVert = new Point(triangle[1].z, triangle[1].y);
      const topVert = new Point(triangle[2].z, triangle[2].y);

      const leftBase = this.midpoint(leftVert, topVert);
      const leftDir = new Point(topVert.z, topVert.y)
      leftDir.minus(leftVert)
      leftDir.rotate90DegreesCCW()
      leftDir.normalize();
      this.drawFract(leftBase, leftDir, side * this.SNOWFLAKE_CHILD_SCALE, iterations - 1);

      const rightBase = this.midpoint(rightVert, topVert);
      const rightDir = new Point(topVert.z, topVert.y)
      rightDir.minus(rightVert)
      rightDir.rotate90DegreesCW()
      rightDir.normalize();
      this.drawFract(rightBase, rightDir, side * this.SNOWFLAKE_CHILD_SCALE, iterations - 1);
    }
  }

  calcTriangle(base, {z, y}, side) {
    const height = this.triangleHeight(side);

    const leftVert = new Point(z, y)

    leftVert.plus(base);
    leftVert.scale(side / 2)
    leftVert.rotate90DegreesCCW()

    const rightVert = new Point(z, y)

    rightVert.scale(side / 2)
    rightVert.plus(base);
    rightVert.rotate90DegreesCW()

    const topVert = new Point(z, y)
    topVert.plus(base);
    topVert.scale(height)

    return [
      {z: leftVert.z, y: leftVert.y},
      {z: rightVert.z, y: rightVert.y},
      {z: topVert.z, y: topVert.y}
    ];
  }

  triangleHeight(side) {
    return Math.sqrt(3) / 2 * side;
  }

  midpoint(v, w) {
    const midpoint = new Point(v.x, v.y)
    midpoint.plus(w)
    midpoint.scale(1 / 2)
    return midpoint
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
}

class Point {
  constructor(z, y) {
    this.z = z || 0
    this.y = y || 0
  }

  plus(w) {
    this.z += w.z;
    this.y += w.y
  }

  minus(w) {
    this.z -= w.z
    this.y -= w.y
  }

  scale(a) {
    this.z *= a
    this.y *= a
  }

  rotate90DegreesCW() {
    this.z = -this.z
  }

  rotate90DegreesCCW() {
    this.y = -this.y
  }

  normalize() {
    this.scale(1 / this.length());
  }

  length() {
    return Math.sqrt(this.z * this.z + this.y * this.y);
  }
}


