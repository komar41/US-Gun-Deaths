const Hover = (d, event, type) => {
     "New text!";
    drawPie(d)
    drawBarAge(d)

    div_tooltip.transition()
        .duration(100)
        .style("opacity", .9);
       
    div_title.transition()
        .duration(100)
        .style("opacity", 1);

    if(type == "state"){
      document.querySelector("#title-pie-bar").innerHTML = "State: " + d.stname + "<br/>" + "Death count: " + d.count
      

      div_tooltip.transition()
                .duration(100)
                .style("opacity", .9);
      div_tooltip.html("State: " + d.stname + "<br/>" + "Death count: " + d.count)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
    }
    
    else{
      document.querySelector("#title-pie-bar").innerHTML = "City: " + d.city + "<br/>" + "Death count: " + d.count
      div_tooltip.html("City: " + d.city + "<br/>" + "Death count: " + d.count)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
    }
}

const mouseOut = (d,event) => {
    div_title.transition()
        .duration(100)
        .style("opacity", 0);
    div_pie.transition()
        .duration(100)
        .style("opacity", 0);
    div_barAge.transition()
        .duration(100)
        .style("opacity", 0);
    div_tooltip.transition()
        .duration(100)
        .style("opacity", 0);
}