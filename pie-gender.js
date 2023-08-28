// set the dimensions and margins of the graph
var pie_width = 250,
    pie_height = 250,
    pie_margin = 0;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(pie_width, pie_height) / 2 - pie_margin

// append the svg object to the div called 'my_dataviz'
var pie_svg = d3.select("#pie-div")
  .append("svg")
    .attr("width", pie_width)
    .attr("height", pie_height)
  .append("g")
    .attr("transform", `translate(${pie_width / 2}, ${pie_height / 2})`);

// Create dummy data
let pie_data = {a: 9, b: 10, c:30, d:40}

// set the color scale
const pie_color = d3.scaleOrdinal()
  .range(d3.schemeSet2);

// console.log(pie_color)

// Compute the position of each group on the pie:
const pie = d3.pie()
  .value(function(d) {return d[1]})
const data_ready = pie(Object.entries(pie_data))

// Now I know that group A goes from 0 degrees to x degrees and so on.

// shape helper to build arcs:
const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

const drawPie = (data) =>{
    pie_data = {F: data.F, M: data.M, unknown_gen: data.unknown_gen}
    const data_ready = pie(Object.entries(pie_data))  
    
    pie_svg.selectAll("*").remove();
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    pie_svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
        .attr('d', arcGenerator)
        .attr('fill', (d) => 
              { 
                if(d.data[0] == 'F') return '#F4A261'
                else if(d.data[0] == 'M') return '#1F78B4'
                else return '#33a02c'
              }
        )
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", 1)

    // Now add the annotation. Use the centroid method to get the best coordinates
    pie_svg
    .selectAll('mySlices')
    .data(data_ready)
    .join('text')
    .text(function(d){ 
      if(d.data[1] !==0) return d.data[1];
    })
    .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
    .style("text-anchor", "middle")
    .style("font-size", 20)
    .style("fill", "white")

    div_pie.transition()
        .duration(100)
        .style("opacity", 1)
}