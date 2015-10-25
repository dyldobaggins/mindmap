Graph = function(){
	return this;
}

Graph.prototype = {
	init: function(element){
		var graph_data = {
		"nodes":[
			{"name":"userOne"},
			{"name":"userTwo"},
			{"name":"userThree"},
			{"name":"userFour"}
		],
		"links":[
		    {"source":0,"target":1,"value":0.33},
		    {"source":0,"target":2,"value":0.99},
		    {"source":0,"target":3,"value":0.45}
		]
		}

		var width = window.innerWidth,
		height = window.innerHeight;

		var color = d3.scale.category20();

		var force = d3.layout.force()
		.charge(-400)
		.size([width, height]);
		force.linkDistance(function(link){
		return (height/2)*link.value;
		});

		force.linkStrength(function(link) {
		return link.value;
		});

		var svg = d3.select(element).append("svg")
		.attr("width", width)
		.attr("height", height);

		force
		  .nodes(graph_data.nodes)
		  .links(graph_data.links)
		  .start();

		  console.log("svg", svg);

		var link = svg.selectAll(".link")
		  .data(graph_data.links)
		.enter().append("line")
		  .attr("class", "link")
		  .style("stroke-width", function(d) { return Math.sqrt(d.value); });

		var node = svg.selectAll(".node")
		  .data(graph_data.nodes)
		.enter().append("circle")
		  .attr("class", "node")
		  .attr("r", 5)
		  .call(force.drag);

		node.append("title")
		  .text(function(d) { return d.name; });

		force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
		    .attr("y1", function(d) { return d.source.y; })
		    .attr("x2", function(d) { return d.target.x; })
		    .attr("y2", function(d) { return d.target.y; });

		node.attr("cx", function(d) { return d.x; })
		    .attr("cy", function(d) { return d.y; });
		});
		return this;
	}
}

/*var graph_data = {
		"nodes":[
			{"name":"userOne"},
			{"name":"userTwo"},
			{"name":"userThree"},
			{"name":"userFour"}
		],
		"links":[
		    {"source":0,"target":1,"value":0.33},
		    {"source":0,"target":2,"value":0.99},
		    {"source":0,"target":3,"value":0.45}
		]
	}

	var width = window.innerWidth,
	    height = window.innerHeight;

	var color = d3.scale.category20();

	var force = d3.layout.force()
	    .charge(-400)
	    .size([width, height]);
	force.linkDistance(function(link){
		return (height/2)*link.value;
	});

	force.linkStrength(function(link) {
	    return link.value;
	});

	var svg = d3.select(element).append("svg")
	    .attr("width", width)
	    .attr("height", height);

	force
	      .nodes(graph_data.nodes)
	      .links(graph_data.links)
	      .start();

	      console.log("svg", svg);

	  var link = svg.selectAll(".link")
	      .data(graph_data.links)
	    .enter().append("line")
	      .attr("class", "link")
	      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

	  var node = svg.selectAll(".node")
	      .data(graph_data.nodes)
	    .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", 5)
	      .call(force.drag);

	  node.append("title")
	      .text(function(d) { return d.name; });

	  force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

	    node.attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; });
	  });*/