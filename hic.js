var data; // a global

d3.json("Chr1.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;

  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

  function zoomed() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }

  var svg = d3.select('body')
    .append('svg')
    .attr('width', 2000)
    .attr('height', 2000)
    .append('g')
    .call(zoom)
    .append('g');

  var size = 3;

  var color = d3.scale.linear()
    .domain([0,25])
    .range(['white', 'red']);

  var rectangles = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d){return d.row  * size;})
    .attr('y', function(d){return d.col  * size;})
    .attr('width', size)
    .attr('height', size)
    .attr('fill', function(d){return color(d.count);})
    .style("pointer-events", "all");

 

});






 
