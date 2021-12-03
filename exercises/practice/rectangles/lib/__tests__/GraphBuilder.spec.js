const GraphBuilder = require('../GraphBuilder');
const Node = require('../Node');

describe('Node', () => {

  describe('nodeAt', () => {

    test('zero node', () => {
      const graphBuilder = new GraphBuilder();
      const node = graphBuilder.nodeAt(0,0);
      expect(node).toEqual(new Node(0,0));
    });

    test('non zero node', () => {
      const graphBuilder = new GraphBuilder();
      const node = graphBuilder.nodeAt(1,4);
      expect(node).toEqual(new Node(1,4));
    });

    test('get cached zero node', () => {
      const gb = new GraphBuilder();
      const node1 = gb.nodeAt(0, 0);
      const node2 = gb.nodeAt(0, 0);
      expect(node1).toBe(node2);
    });

    test('get cached non zero node', () => {
      const gb = new GraphBuilder();
      const node1 = gb.nodeAt(1, 4);
      const node2 = gb.nodeAt(1, 4);
      expect(node1).toBe(node2);
    });


  });

  describe('nodes', () => {

    test('initially empty', () => {
      const graphBuilder = new GraphBuilder();
      expect(graphBuilder.nodes).toEqual([]);
    });

    test('has instantiated nodes', () => {
      const gb = new GraphBuilder();
      const n1 = gb.nodeAt(1,1);
      const n2 = gb.nodeAt(1,2);
      gb.nodeAt(1,1);
      expect(gb.nodes).toEqual([ n1, n2 ]);
    });
  });

  describe('read row', () => {

    test('single node', () => {
      const gb = new GraphBuilder();
      gb.readRow(0, '+');
      expect(gb.nodes).toEqual([ new Node(0, 0) ]);
    });

    test('2 touching nodes', () => {
      const gb = new GraphBuilder();
      gb.readRow(0, '++');
      const n0_0 = new Node(0, 0);
      const n1_0 = new Node(1, 0);
      n0_0.addRight(n1_0);
      expect(gb.nodes).toEqual([n0_0, n1_0]);
      expect(n0_0.nodesRight).toEqual([ n1_0 ]);
    });

    test('2 linked nodes', () => {
      const gb = new GraphBuilder();
      gb.readRow(0, '+-+');
      const n0_0 = new Node(0, 0);
      const n2_0 = new Node(2, 0);
      n0_0.addRight(n2_0);
      expect(gb.nodes).toEqual([n0_0, n2_0]);
      expect(n0_0.nodesRight).toEqual([ n2_0 ]);
    });

    test('2 split nodes by gap', () => {
      const gb = new GraphBuilder();
      gb.readRow(0, '+ +');
      const n0_0 = new Node(0, 0);
      const n2_0 = new Node(2, 0);
      expect(gb.nodes).toEqual([n0_0, n2_0]);
      expect(n0_0.nodesRight).toEqual([ ]);
    });

    test('2 split nodes by vertical', () => {
      const gb = new GraphBuilder();
      gb.readRow(0, '+|+');
      const n0_0 = new Node(0, 0);
      const n2_0 = new Node(2, 0);
      expect(gb.nodes).toEqual([n0_0, n2_0]);
      expect(n0_0.nodesRight).toEqual([ ]);
    });

    test('empty row', () => {
      const gb = new GraphBuilder();
      gb.readRow(0, '   ');
      expect(gb.nodes).toEqual([]);
    });

    test('3 linked nodes', () => {
      const gb = new GraphBuilder();
      gb.readRow(0, '+-++');
      const n0_0 = new Node(0, 0);
      const n2_0 = new Node(2, 0);
      const n3_0 = new Node(3, 0);
      n0_0.addRight(n2_0);
      n0_0.addRight(n3_0);
      n2_0.addRight(n3_0);
      expect(gb.nodes).toEqual([n0_0, n2_0, n3_0]);
      expect(n0_0.nodesRight).toEqual([ n2_0, n3_0 ]);
      expect(n2_0.nodesRight).toEqual([ n3_0 ]);
      expect(n3_0.nodesRight).toEqual([ ]);
    });


  });

  describe('read grid', () => {

    test('single node', () => {
      const gb = new GraphBuilder();
      gb.readGrid(['+']);
      expect(gb.nodes).toEqual([ new Node(0, 0) ]);
    });

    test('vertical touching nodes', () => {
      const gb = new GraphBuilder();
      gb.readGrid([
        '+',
        '+',
      ]);
      const n0_0 = new Node(0, 0);
      const n0_1 = new Node(0, 1);
      n0_0.addDown(n0_1);
      expect(gb.nodes).toEqual([ n0_0, n0_1 ]);
      expect(n0_0.nodesRight).toEqual([]);
      expect(n0_0.nodesDown).toEqual([ n0_1 ]);
    });

    test('vertical touching nodes', () => {
      const gb = new GraphBuilder();
      gb.readGrid([
        '+',
        '|',
        '+',
      ]);
      const n0_0 = new Node(0, 0);
      const n0_2 = new Node(0, 2);
      n0_0.addDown(n0_2);
      expect(gb.nodes).toEqual([ n0_0, n0_2 ]);
      expect(n0_0.nodesRight).toEqual([]);
      expect(n0_0.nodesDown).toEqual([ n0_2 ]);
    });

    test('vertical split nodes by row link', () => {
      const gb = new GraphBuilder();
      gb.readGrid([
        '+',
        '-',
        '+',
      ]);
      const n0_0 = new Node(0, 0);
      const n0_2 = new Node(0, 2);
      expect(gb.nodes).toEqual([ n0_0, n0_2 ]);
      expect(n0_0.nodesDown).toEqual([]);
    });

    test('vertical split nodes by gap', () => {
      const gb = new GraphBuilder();
      gb.readGrid([
        '+',
        ' ',
        '+',
      ]);
      const n0_0 = new Node(0, 0);
      const n0_2 = new Node(0, 2);
      expect(gb.nodes).toEqual([ n0_0, n0_2 ]);
      expect(n0_0.nodesDown).toEqual([]);
    });


    test('2x2 square ', () => {
      const gb = new GraphBuilder();
      gb.readGrid([
        '++',
        '++',
      ]);
      const topLeft = new Node(0, 0);
      const topRight = new Node(1, 0);
      const bottomLeft = new Node(0, 1);
      const bottomRight = new Node(1, 1);
      topLeft.addRight(topRight);
      topLeft.addDown(bottomLeft);
      bottomLeft.addRight(bottomRight);
      topRight.addDown(bottomRight);
      expect(gb.nodes).toEqual([ topLeft, topRight, bottomLeft, bottomRight ]);
    });

    test('3x3 square ', () => {
      const gb = new GraphBuilder();
      gb.readGrid([
        '+-+',
        '| |',
        '+-+',
      ]);
      const topLeft = new Node(0, 0);
      const topRight = new Node(2, 0);
      const bottomLeft = new Node(0, 2);
      const bottomRight = new Node(2, 2);
      topLeft.addRight(topRight);
      topLeft.addDown(bottomLeft);
      bottomLeft.addRight(bottomRight);
      topRight.addDown(bottomRight);
      expect(gb.nodes).toEqual([ topLeft, topRight, bottomLeft, bottomRight ]);
    });

  });

  describe('count rectangles', () => {

    test('3x3 square', () => {
      const gb = new GraphBuilder();
      gb.readGrid([
        '+-+',
        '| |',
        '+-+',
      ]);
      expect(gb.rectangleCount).toEqual(1);
    });

    test('2 3x3 square', () => {
      const gb = new GraphBuilder();
      gb.readGrid([
        '+-+ +-+',
        '| | | |',
        '+-+ +-+',
      ]);
      expect(gb.rectangleCount).toEqual(2);
    });

  });


});
