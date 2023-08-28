const MARGINS = {top: 20, bottom: 40}; // Keeping margins to make space for the axes
const CHART_WIDTH = 1800;
const CHART_HEIGHT = 300 - MARGINS.top - MARGINS. bottom;


const chartContainer = d3
                      .select('#chart')
                      .attr('width', CHART_WIDTH)
                      .attr('height', CHART_HEIGHT + MARGINS.top );

                      
const chart = chartContainer.append('g'); //group element

let xScale = d3
                .scaleBand()
                .rangeRound([0, CHART_WIDTH])
                .padding(0.1);

let yScale = d3.scaleLinear().range([CHART_HEIGHT, 0]);

const addBottomAxesLabel = (data) =>{
    chart
    .append('g')
    .call(d3.axisBottom(xScale).tickSizeInner(4).tickSizeOuter(0))
    .attr('transform', `translate(0, ${CHART_HEIGHT})`)
    .attr('color', '#000000')
    .style("font", "18px times");
}

d3.csv(`data/by_state.csv`, d=>{
        return {
        loc : d.state,
        count : +d.count
    };
}).then((data) =>{
    xScale.domain(data.map( (d) => d.loc) )
    yScale.domain([0, d3.max(data, d => d.count) + 150])
    addBottomAxesLabel(data)
    renderChart(data)
});

const renderChart = (selectedData) =>{
// To add bars
chart
    .selectAll('.bar')
    .data(selectedData, d => d.loc) // Based on ids, data should be identified. This is placed everywhere where data is binded to create/remove something
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', d => CHART_HEIGHT - yScale(d.count))
    .attr('x', d => xScale(d.loc))
    .attr('y', d => yScale(d.count))

// To remove bars based on selected/unselected data
chart.selectAll('.bar').data(selectedData, d => d.loc).exit().remove();

// labels for bar values
chart
    .selectAll('.label') // Not there so we will create it based on the data
    .data(selectedData, d => d.id)
    .enter()
    .append('text')
    .text((d) => d.count)
    .attr('x', d => xScale(d.loc) + xScale.bandwidth() / 2) // positioning the labels
    .attr('y', d => yScale(d.count) - 10) // positioning the labels
    .attr('text-anchor', 'middle')
    .classed('label', true)
    .style("font", "18px times");

// To remove labels based on selected/unselected data
chart.selectAll('.label').data(selectedData, d => d.loc).exit().remove();
}