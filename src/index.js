import React, { Component } from 'react'
import SubmitData from './components/SubmitData.js';
import { select } from 'd3-selection'
import { findMax, smooth, findNeighbors, allData, riskColors } from './helpers/helpers.js'
import trainingData from './TrainingData/TrainingData.js';

class KNearestNeighbors extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.training || trainingData,
      h: props.h,
      w: props.w
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createBarChart = this.createBarChart.bind(this);
    this.placeDatum = this.placeDatum.bind(this);
    this.populateGraph = this.populateGraph.bind(this);
    this.classifyAndPlot = this.classifyAndPlot.bind(this);
    this.max = null;
    this.svgSelection = null;
  }
  componentDidMount() {
     this.createBarChart()
  }
  componentDidUpdate() {
     this.createBarChart()
  }

  handleSubmit(e) {
    e.preventDefault();
    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    var patient = {
      x: x,
      y: y,
      neighbors: [],
      identity: 0
    };
    this.classifyAndPlot([patient]);
    document.getElementById('x').value = '';
    document.getElementById('y').value = '';
  }

  createBarChart() {
    this.svgSelection = select(this.node);

    this.svgSelection.select('svg')
                .attr("width", this.state.w)
                .attr("height", this.state.h)
                .enter()
                .append('svg')
    this.svgSelection.append('rect')
                 .attr('x', 0)
                 .attr('y', 0)
                 .attr('width', this.state.w)
                 .attr('height', this.state.h)
                 .style("stroke", 'black')
                 .style("fill", "none")
                 .style("stroke-width", 4)
                 .enter()
                 .append('svg');
    this.populateGraph(this.state.data);


  }
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
        if(adjust) {smooth(datum, this.max)};
        this.placeDatum(datum, encircle);
        return datum;
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
        console.log('neighbor id: ', neighborsIdentity);
        datum.identity = neighborsIdentity.indexOf(maximum);
        return datum;
      });
      this.populateGraph(formattedData, false, true);
    }


render() {
    return (
      <div>
        <svg id='svg' style={{'height':this.state.h}} ref={node => this.node = node}/>
        <SubmitData submit={this.handleSubmit}/>
      </div>
    )
  }
}
export default KNearestNeighbors;