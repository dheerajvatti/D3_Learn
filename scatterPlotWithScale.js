var dataset = [
                [30, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];

var w = 800;
var h = 400;
var padding = 20;

var svg = d3.select("body")
            .append("svg")
            .attr("width",w)
            .attr("height",h);


//scaling

var xScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                     //.range([0, w]);
                     .range([padding, w - padding]);


var yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                    //.range([0, h]);
                    // You may have noticed that smaller y values are at the top of the plot, and the larger y values are toward the bottom. Now that we’re using scales,
                    // it’s super easy to reverse that, so greater values are higher up, as you would expect. It’s just a matter of changing the output range of yScale
                    //.range([h, 0]);
                    .range([h - padding, padding]);

    

    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
//circles need cx, cy, and r
       .attr("cx", function(d) {
            return xScale(d[0]);
        })
       .attr("cy",function(d){
          return yScale(d[1]);
       })
       .attr("r", function(d) {
    return Math.sqrt(h - d[1]);
});


//applying labels

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
        return d[0] + "," + d[1];
   })
   .attr("x", function(d) {
        return xScale(d[0]);
   })
   .attr("y", function(d) {
         return yScale(d[1]);
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "red");    


