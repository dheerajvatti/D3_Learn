//uses inbuilt line() dunction 

var w = 300;
var h = 300;

var monthlysales = [
    {"month":1,"sales":100},
    {"month":2,"sales":200},
    {"month":3,"sales":300},
    {"month":4,"sales":400},
    {"month":5,"sales":500},
    {"month":6,"sales":600},
    {"month":12,"sales":100},
    ];


var svg = d3.select("body").append("svg")
            .attr("width",w)
            .attr("height",h);
var lineChart = d3.line()
                 .x(function(d){return d.month;})
                  .y(function(d){return d.sales;});
                  //.interpolate("linear");




var viz = svg.append("path") //path is generalized SVG element used to draw any non specfic shape
                .attr("d",lineChart(monthlysales))
                .attr("stroke","red")
                .attr("stroke-width",2)
                .attr("fill","none");
