var w = 300;
var h = 400;
var padding = 2;
var dataset = [5,10,20,30,40,50,40,30,20,10,5];

var svg = d3.select("body").append("svg")
            .attr("width",w)
            .attr("height",h);

 function colorPicker(v){
    if(v<=20) { return "#666666";}
    else if(v>20) {return "#FF0033";}
}

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
 .attr("x",function(d,i){
    return i * (w /dataset.length)
})
    .attr("y",function(d){
    return h - (d*4);
})
    .attr("width", (w/dataset.length - padding))
    .attr("height",function(d){
    return d *4;
})    
    .attr("fill",function(d){
    //return "rgb(0," + (d*10) +",0)"; // using RGB corrdinatesf or synamic coloring
    return colorPicker(d);
});


//Adding Labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function (d){ 
       return d;
    }) 
   //calculate the x position by setting it to the left edge of each bar plus half the bar width
   .attr("x", function(d, i) {
        return i * (w / dataset.length) + (w / dataset.length - padding) / 2;
    })
   .attr("y", function(d) {
        return h - (d * 4) + 14;  
    })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "black")
   .attr("text-anchor", "middle");
  
 

//-----------------------------using JSON multi value map for attributes --not working -- check it later
// .attr({
//         x:function(d,i) {
//           return i* (w/ dataset.length);
//         },
//         y: function(d){
//             return h - (d *4);
//         },
//         width:w/dataset.length - padding,                
//         height: function(d){  return d * 4;  },
//         fill: function(d) {
//             return red;//"rgb(0," + (d*10) +",0)";
//         }

// });





   