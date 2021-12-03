const GraphBuilder = require('./lib/GraphBuilder');

export function count(grid) {
  const graphBuilder = new GraphBuilder();
  graphBuilder.readGrid(grid);
  return graphBuilder.rectangleCount;
}
