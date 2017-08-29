placeDatum(datum, encircle) {
  this.svgSelection.append('circle')
              .attr('cx', datum.x)
              .attr('cy', datum.y)
              .attr('r', 5)
              .attr('fill', riskColors[datum.identity])
              .enter()
              .append('svg')
}
populateGraph(data, adjust=true, encircle=false) {
  if(this.max === null){this.max = findMax(data)};
  data.map(datum => {
    allData.push(datum);
    adjust ? smooth(datum, this.max) : null;
    this.placeDatum(datum, encircle);
  });
}
classifyAndPlot (data) {
  if(this.max === null){this.max = findMax(data)};

  data.map(datum => smooth(datum, this.max));
  findNeighbors(data, 3); 
  var formattedData = data.map(datum => {
  var neighborsIdentity = datum.neighbors.reduce((acc, neighbor) => {
    acc[neighbor[1]] === undefined ? acc[neighbor[1]] = 1 : acc[neighbor[1]] = acc[neighbor[1]] + 1;
    return acc;
  }, []);
    var maximum = Math.max(...neighborsIdentity.filter(neighbor => neighbor));
    datum.identity = neighborsIdentity.indexOf(maximum);
    return datum;
  });
  this.populateGraph(formattedData, false, true);
}
