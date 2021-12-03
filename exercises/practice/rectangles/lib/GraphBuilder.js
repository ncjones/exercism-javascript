const Node = require('./Node');

class GraphBuilder {

  constructor() {
    this.nodesByCoords = {};
    this.rowChains = {};
    this.columnChains = {};
  }

  get nodes() {
    return Object.values(this.nodesByCoords);
  }

  get rectangleCount() {
    let count = 0;
    for (const node of this.nodes) {
      count += node.countRectangles();
    }
    return count;
  }

  nodeAt(x, y) {
    const coordsKey = `${x}:${y}`;
    const existingNode = this.nodesByCoords[coordsKey];
    if (existingNode) {
      return existingNode;
    }
    const newNode = new Node(x, y);
    this.nodesByCoords[coordsKey] = newNode;
    return newNode;
  }

  readRow(y, row) {
    row.split('').forEach((n , x) => {
      switch (n) {
        case '+':
          this.addNodeAt(x,y);
          break;
        case ' ':
          /* this is a gap */
          this.endColumnChainAt(x);
          this.endRowChainAt(y);
          break;
        case '-':
          /* this is a row edge */
          this.endColumnChainAt(x);
          break;
        case '|':
          /* this is a column edge */
          this.endRowChainAt(y);
          break;
      }
    });
  }

  readGrid(grid) {
    grid.forEach((row, y) => {
      this.readRow(y, row);
    });
  }

  endRowChainAt(y) {
    this.rowChains[y] = [];
  }

  endColumnChainAt(x) {
    this.columnChains[x] = [];
  }

  addNodeAt(x, y) {
    /* make new node */
    const node = this.nodeAt(x, y);

    /* find row chain */
    if (!this.rowChains[node.y]) {
      this.rowChains[node.y] = [];
    }
    const rowChain = this.rowChains[node.y];
    /* add "right" from all linked row nodes  */
    rowChain.forEach(rowChainNode => {
      rowChainNode.addRight(node);
    });
    /* add to row chain */
    rowChain.push(node);

    /* find column chain */
    if (!this.columnChains[node.x]) {
      this.columnChains[node.x] = [];
    }
    const columnChain = this.columnChains[node.x];
    /* add "down" from all linked column nodes  */
    columnChain.forEach(columnChainNode => {
      columnChainNode.addDown(node);
    });
    /* add to column chain */
    columnChain.push(node);
  }

}

module.exports = GraphBuilder;
