// Move along x and y axis
var width = 800; 
var height = 500;

// D3 Projection
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]) // translate to center of screen
  .scale([1000]); // scale things down so see entire US

// Define path generator
var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

//Create SVG element and append map to the SVG
var svg = d3.select('#canvas')
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//   console.log(projection)
// Load in my states data!
d3.csv("data/by_state.csv").then(data =>{
    
    d3.json('data/us-states.json').then(json =>{
        
        // Loop through each state data value in the .csv file
        data.forEach(d => {
            // console.log(d)
            dataState = d.stname // state name
            dataCount = +d.count // death count

            // console.log(dataState, dataCount)
            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;
                // console.log(jsonState)
                if (dataState == jsonState) {
                    // Copy the death count into the JSON
                    json.features[j].properties.count = dataCount;
                    json.features[j].count = dataCount;
                    json.features[j].state = d.state;
                    json.features[j].stname = d.stname;
                    json.features[j].F = +d.F;
                    json.features[j].M = +d.M;
                    json.features[j].ageGroup1 = +d.ageGroup1;
                    json.features[j].ageGroup2 = +d.ageGroup2;
                    json.features[j].ageGroup3 = +d.ageGroup3;
                    json.features[j].unknown_age = +d.unknown_age;
                    json.features[j].unknown_gen = +d.unknown_gen;
                    break;
                }
            }
        });

        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "0.25")
        .attr('fill', (d) => { // setting a 'fill' attribute on the new path selection, giving a function that takes in an item from the array
            let cnt = d.properties.count// create a variable called percentage and reference the 'bachelorsOrHigher' field which contains the percentage of adults in the county with a bachelors degree or higher. In our case it would be count
            if(cnt <= 10){
                return '#fcbba1'
            }
            else if(cnt > 10 && cnt <= 50){
                return '#fc9272'
            }else if(cnt > 50 && cnt <= 100){
                return '#fb6a4a'
            }else if(cnt > 100 && cnt <= 200){
                return '#ef3b2c'
            }else if(cnt > 200 && cnt <= 400){
                return '#cb181d'
            }else if(cnt > 400){
                return '#a50f15'
            }
            // instead of manually assigning color we can use something like below
            // color = d3.scaleQuantize()
            // .domain([1, 10])
            // .range(d3.schemePurples[9]);
            // And then, .style("fill", d => color(rateById[d.id])) 

        })
        .attr('opacity', 0.7)
        .on("mouseover", (event, d)=>{
            d = {
                stname: d.stname,
                state : d.state,
                count : +d.count,
                ageGroup1: +d.ageGroup1,
                ageGroup2: +d.ageGroup2,
                ageGroup3: +d.ageGroup3,
                unknown_age: +d.unknown_age,
                F: +d.F,
                M: +d.M,
                unknown_gen: +d.unknown_gen
            }
            Hover(d, event, "state")
        })
        .on("mouseout", mouseOut);
    
        

        d3.csv('data/by_city.csv', d=>{
            return {
                city : d.city,
                lng: +d.lng,
                count : +d.count,
                lat : +d.lat,
                ageGroup1: +d.ageGroup1,
                ageGroup2: +d.ageGroup2,
                ageGroup3: +d.ageGroup3,
                unknown_age: +d.unknown_age,
                F: +d.F,
                M: +d.M,
                unknown_gen: +d.unknown_gen
            };
        }).then(
            (data) => {
                // console.log(data)
                circleData = data
                drawCityCircles()
                svg.select("circle")
                .raise()
            }
        )

    })
})

var div_tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

var div_pie = d3.select('#pie-chart-div').style("opacity", "0");

var div_barAge = d3.select('#bar-div').style("opacity", "0");

var div_title = d3.select('#title-pie-bar').style("opacity", "0");

let drawCityCircles = () => {
    svg
        .selectAll("circle")
        .data(circleData)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.lng, d.lat])[0])
        .attr('cy', d => projection([d.lng, d.lat])[1])
        .attr('r', d => Math.sqrt(d.count)*1.2)
        .style("fill", "#FFBF00")	
        .style("opacity", 0.9)
        .style("stroke", "#444")
        .style("stroke-width", "1")
        .on("mouseover", (event, d)=>{
            Hover(d, event, "city")
        })
        .on("mouseout", mouseOut);
}






