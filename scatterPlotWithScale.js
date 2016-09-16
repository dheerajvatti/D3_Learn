// var dataset = [
//                 [30, 20], [480, 90], [250, 50], [100, 33], [330, 95],
//                 [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
//               ];


var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.round(Math.random() * xRange);
    var newNumber2 = Math.round(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
}

var w = 1000;
var h = 400;
var padding = 20;

var svg = d3.select("body")
            .append("svg")
            .attr("width",w)
            .attr("height",h);


//scaling


// d3.scale.linear() has several other handy methods that deserve a brief mention here:

//------------------
// nice() — This tells the scale to take whatever input domain that you gave to range() and expand both ends to the nearest round value. From the D3 wiki: “For example, for a domain of [0.20147987687960267, 0.996679553296417], the nice domain is [0.2, 1].” This is useful for normal people, who find it hard to read numbers like 0.20147987687960267.
// rangeRound() — Use rangeRound() in place of range() and all values output by the scale will be rounded to the nearest whole number. This is useful if you want shapes to have exact pixel values, to avoid the fuzzy edges that may arise with antialiasing.
// clamp() — By default, a linear scale can return values outside of the specified range. For example, if given a value outside of its expected input domain, a scale will return a number also outside of the output range. Calling .clamp(true) on a scale, however, forces all output values to be within the specified range. Meaning, excessive values will be rounded to the range’s low or high value (whichever is nearest).
//-------------------

var xScale = d3.scaleLinear()
								 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
								 .range([padding, w - padding * 2]);


var yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                    //.range([0, h]);
                    // You may have noticed that smaller y values are at the top of the plot, and the larger y values are toward the bottom. Now that we’re using scales,
                    // it’s super easy to reverse that, so greater values are higher up, as you would expect. It’s just a matter of changing the output range of yScale
                    //.range([h, 0]);
                    .range([h - padding, padding]);

var rScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([2, 5]);

    

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
     return rScale(d[1]);
});


//applying labels

// svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(function(d) {
//         return d[0] + "," + d[1];
//    })
//    .attr("x", function(d) {
//         return xScale(d[0]);
//    })
//    .attr("y", function(d) {
//          return yScale(d[1]);
//    })
//    .attr("font-family", "sans-serif")
//    .attr("font-size", "11px")
//    .attr("fill", "red");    



//==========================================================================
//Setting up an Axis

//Much like the scale functions, D3’s axes are actually functions whose parameters you define. Unlike scales, when an axis function is called, it doesn’t return a value, 
//but generates the visual elements of the axis, including lines, labels, and ticks.

//Note that the axis functions are SVG-specific, as they generate SVG elements. Also, axes are intended for use with quantitative scales (as opposed to ordinal ones).
//===========================================================================

var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .ticks(5);

var yAxis = d3.axisLeft()
                  .scale(yScale)                
                  .ticks(5);
                 


//Finally, to actually generate the axis and insert all those little lines and labels into our SVG, we must call the xAxis function

svg.append("g")
    .attr("class", "axis")  //Assign "axis" class
    .attr("transform", "translate(0," + (h - padding) + ")") //transform the entire axis group, pushing it to the bottom
    //Note the use of (h - padding), so the group’s top edge is set to h, the height of the entire image, minus the padding value
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);