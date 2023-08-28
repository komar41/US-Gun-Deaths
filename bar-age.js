// set the dimensions and margins of the graph
var margin = {top: 0, right: 100, bottom: 50, left: 100},
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
let bar_svg = d3.select("#bar-div")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

let barAge_data

const drawBarAge = (data) => {
    
    barAge_data = []
    barAge_data.push({ageGroup: "0 to 12 Years", value: data.ageGroup1}, {ageGroup: "13 to 17 Years", value: data.ageGroup2}, {ageGroup: "18 and Above", value: data.ageGroup3}, {ageGroup: "Unknown", value: data.unknown_age})
    console.log(barAge_data)
    // Add X axis
    // Adds new text everytime. Have to do exit here() **
    let maxVal = d3.max(barAge_data, d => +d.value)

    bar_svg.selectAll("*").remove();

    const x = d3.scaleLinear()
    .domain([0, maxVal]) // Have to make the domain responsive to data **
    .range([ 0, width]);

    // Y axis
    // Adds new text everytime. Have to do exit here()
    const y = d3.scaleBand()
        .range([ 0, height ])
        .domain(barAge_data.map(d => d.ageGroup))
        .padding(.3);

    bar_svg.append("g")
        .call(d3.axisLeft(y))
        .style("font", "14px times")

    // Actual Numbers on the horizontal bar chart. Here, I set it manually. But have to do it dynamically
    bar_svg
        .selectAll('.label') // Not there so we will create it based on the data
        .data(barAge_data, d => d.ageGroup)
        .enter()
        .append('text')
        .text((d) => d.value)
        .attr('x', d => 180) // positioning the labels
        .attr('y', d => {
            if(d.ageGroup == "0 to 12 Years") return 50
            else if(d.ageGroup == "13 to 17 Years") return 100
            else if(d.ageGroup == "18 and Above") return 160
            else return 220
        }) // positioning the labels
        .attr('text-anchor', 'middle')
        .classed('label', true)
        .style("font", "18px times");

    // Positioning the label
    bar_svg.append("g")
        .append('text')
        .text('Age Distribution')
        .attr('x', 40) // positioning the labels
        .attr('y', 270)
        .attr('fill', "black")
        .attr('font-weight', 'bold')
        .attr('font-size', '1.7em') 
        // {
        // <g><text x="70" y="160" fill="black" font-weight="bold" font-size="1.7em">Gender Distribution</text></g>

    // console.log(data)
    // console.log(barAge_data)
    //Bars
    bar_svg.selectAll("myRect")
    .data(barAge_data)
    .join("rect")
    // .attr("x", x(0) )
    .attr("y", d => y(d.ageGroup))
    .attr("width", d => x(d.value))
    .attr("height", y.bandwidth())
    .attr("fill", "#beaed4")
    .attr('stroke', 'black')

    div_barAge.transition()
        .duration(100)
        .style("opacity", 1)
}
    