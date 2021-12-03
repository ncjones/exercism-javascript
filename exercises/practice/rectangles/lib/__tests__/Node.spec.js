const Node = require('../Node');

describe('Node', () => {

  describe('constructor', () => {

    test('zero node', () => {
      const node = new Node(0, 0)
      expect(node.x).toEqual(0);
      expect(node.y).toEqual(0);
      expect(node.nodesRight).toEqual([]);
      expect(node.nodesDown).toEqual([]);
    });

    test('non zero node', () => {
      const node = new Node(1,4);
      expect(node.x).toEqual(1);
      expect(node.y).toEqual(4);
      expect(node.nodesRight).toEqual([]);
      expect(node.nodesDown).toEqual([]);
    });

  });

  describe('addRight', () => {

    test('node added', () => {
      const node1 = new Node(1,4);
      const node2 = new Node(1,6);
      node1.addRight(node2);
      expect(node1.nodesRight).toEqual([ node2 ]);
      expect(node1.nodesDown).toEqual([]);
    });

  });

  describe('addDown', () => {

    test('node added', () => {
      const node1 = new Node(1,4);
      const node2 = new Node(1,6);
      node1.addDown(node2);
      expect(node1.nodesRight).toEqual([]);
      expect(node1.nodesDown).toEqual([ node2 ]);
    });

  });

  describe('hasNodeRightAt', () => {

    test('no nodes right', () => {
      const node1 = new Node(1,1);
      expect(node1.hasNodeRightAt(1)).toEqual(false);
    });

    test('node right at target location', () => {
      const node1 = new Node(1,1);
      const node2 = new Node(3,1);
      node1.addRight(node2);
      expect(node1.hasNodeRightAt(3)).toEqual(true);
    });

    test('node right at wrong location', () => {
      const node1 = new Node(1,1);
      const node2 = new Node(3,1);
      node1.addRight(node2);
      expect(node1.hasNodeRightAt(2)).toEqual(false);
    });

  });

  describe('hasNodeDownAt', () => {

    test('no nodes down', () => {
      const node1 = new Node(1,1);
      expect(node1.hasNodeDownAt(1)).toEqual(false);
    });

    test('node down at target location', () => {
      const node1 = new Node(1,1);
      const node2 = new Node(1,3);
      node1.addDown(node2);
      expect(node1.hasNodeDownAt(3)).toEqual(true);
    });

    test('node down at wrong location', () => {
      const node1 = new Node(1,1);
      const node2 = new Node(1,3);
      node1.addDown(node2);
      expect(node1.hasNodeDownAt(2)).toEqual(false);
    });

  });

  describe('countRectangles', () => {

    test('zero rectangles / 0 connected nodes', () => {
      const node1 = new Node(1,1);
      expect(node1.countRectangles()).toEqual(0);
    });

    test('zero rectangles / 1 connected nodes', () => {
      const node1 = new Node(1,1);
      const node2 = new Node(1,2);
      node1.addRight(node2);
      expect(node1.countRectangles()).toEqual(0);
      expect(node2.countRectangles()).toEqual(0);
    });

    test('1 rectangle', () => {
      const topLeft = new Node(1,1);
      const topRight = new Node(2,1);
      const bottomLeft = new Node(1,2);
      const bottomRight = new Node(2,2);
      topLeft.addRight(topRight);
      topLeft.addDown(bottomLeft);
      bottomLeft.addRight(bottomRight);
      topRight.addDown(bottomRight);
      expect(topLeft.countRectangles()).toEqual(1);
    });

  });

});
