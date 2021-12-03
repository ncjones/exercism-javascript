
class Node {

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.nodesRight = [];
    this.nodesDown = [];
  }

  addRight(node) {
    this.nodesRight.push(node);
  }

  addDown(node) {
    this.nodesDown.push(node);
  }

  countRectangles() {
    let rectangleCount = 0;
    for (const topRight of this.nodesRight) {
      for (const bottomLeft of this.nodesDown) {
        if (
          bottomLeft.hasNodeRightAt(topRight.x) &&
          topRight.hasNodeDownAt(bottomLeft.y)
        ) {
          rectangleCount += 1;
        }
      }
    }
    return rectangleCount;
  }

  hasNodeRightAt(x) {
    return this.nodesRight
      .some(node => node.x === x);
  }

  hasNodeDownAt(y) {
    return this.nodesDown
      .some(node => node.y === y);
  }

}

module.exports = Node;
