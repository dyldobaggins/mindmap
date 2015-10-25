Graph = function(user){
	this.user = user;
	return this;
};

Graph.prototype = {
	setData: function(data){
		this.data = data;
	},

	pruneAPIData: function(data){
		var pruned = {};
		pruned.nodes = [];
		pruned.links = [];

		//user node
		pruned.nodes.push({"name": this.user});

		for(user in data){
			pruned.nodes.push({"name": user});
			pruned.links.push({"source": 0, "target": pruned.links.length + 1, "value": data[user].score});
		}
		console.log("pruned", pruned);
		this.setData(pruned);
	},
	init: function(opts){
		var self = this;

		if(!opts){
			opts = {};
		}
		if(!opts.element){
			opts.element = "#graph";
		}

		console.log("data", this.data);
		console.log("element", opts.element);

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

		var svg = d3.select(opts.element).append("svg")
		.attr("width", width)
		.attr("height", height);

		force
		  .nodes(this.data.nodes)
		  .links(this.data.links)
		  .start();

		var link = svg.selectAll(".link")
		  .data(this.data.links)
		.enter().append("line")
		  .attr("class", "link")
		  .style("stroke-width", function(d) { return Math.sqrt(d.value); });

		var node = svg.selectAll(".node")
		  .data(this.data.nodes)
		.enter().append("circle")
		  .attr("class", "node")
		  // .attr("r", 30)
		  .attr("r", function(d){
		  	if(d.index == 0){
		  		return 40;
		  	}
		  	else {
		  		return 20 * self.data.links[d.index - 1].value;
		  	}
		  })
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