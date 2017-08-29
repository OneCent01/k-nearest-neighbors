const findMax = (data) => {
  var results = {x: 0, y: 0};
  data.map(datum => {
    let x = datum.x;
    let y = datum.y;
    if(x > results.x) {results.x = x};
    if(y > results.y) {results.y = y};
    return datum;
  });
  return results;
}

const smooth = (datum, max) => {
  datum.x = (datum.x/max.x) * h;
  datum.y = (datum.y/max.y) * h;
  return datum;
}

const findNeighbors = function(data, k) {
  return data.map(datum => {
    allData.map(neighbor => {
      var xDiff = Math.abs(datum.x - neighbor.x);
      var yDiff = Math.abs(datum.y - neighbor.y);
      var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
      var currentFartherNeighbor = datum.neighbors.find(dataNeighbor => dataNeighbor[0] > distance)
      if(datum.neighbors.length < k) {
        datum.neighbors.push([distance, neighbor.identity]) 
      } else {
        currentFartherNeighbor ? datum.neighbors.splice(datum.neighbors.indexOf(currentFartherNeighbor), 1, [distance, neighbor.identity]) : false;
      }
      datum.neighbors.sort((a, b) => b[0] - a[0]);
      return neighbor;
    });
    return datum;
  });
}

/*~~~~ CONSTANTS ~~~~*/
const h = 300;
const w = 300;
const allData = [];
const riskColors = ['mediumturquoise', 'crimson', 'rebeccapurple'];

module.exports =  { findMax, smooth, findNeighbors, h, w, allData, riskColors };