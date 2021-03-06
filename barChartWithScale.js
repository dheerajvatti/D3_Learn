var w = 600;
var h = 250;
	var barPadding = 2;
			
  	var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 18, 23, 18, 23, 25,25 ];
			
			// var xScale = d3.scaleOrdinal()
			// 				.domain(d3.range(dataset.length))
			// 				.range([0, w], 0.05);

			// var yScale = d3.scaleLinear()
			// 				.domain([0, d3.max(dataset)])
			// 				.range([0, h]);
    
        

        var xScale = d3.scaleBand()
							.domain(d3.range(dataset.length))
							.rangeRound([0, w]);

		
			var yScale = d3.scaleLinear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);
    
    //Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
                  .attr("width", w / dataset.length - barPadding)
			  //.attr("width", xScale.unknown())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   });
  

  //Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {  
			   		//return xScale(i) + xScale.unknown() / 2;
                   	return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");