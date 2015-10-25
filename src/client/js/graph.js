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
			pruned.nodes.push({"name": data[user].name, "avatar": data[user].avatar});
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

		force.nodes(this.data.nodes)
			.links(this.data.links)
			.start();

		var link = svg.selectAll(".link")
			.data(this.data.links)
			.enter().append("line")
			.attr("class", "link")
			.style("stroke-width", function(d) { return Math.sqrt(d.value); });

		var node = svg.selectAll(".node")
			.data(this.data.nodes)
			.enter().append('g')
			.call(force.drag);

		node.append("clipPath")
	    .attr("id", function(d){
	    	return "ellipse-clip" + d.index;
	    })
	  .append("ellipse")
	    .attr("cx", function(d){
	    	return 0;
	    })
	    .attr("cy", function(d){
	    	return 0;
	    })
	    .attr("rx", function(d){
	    	if(d.index == 0){
	    		d.radius = 50;
	    		return Math.abs(d.radius - 5);
	    	}
	    	else {
	    		d.radius = 35 * self.data.links[d.index - 1].value;
	    		return Math.abs(d.radius - 5);
	    	}
	    })
	    .attr("ry", function(d){
	    	if(d.index == 0){
	    		d.radius = 50;
	    		return Math.abs(d.radius - 5);
	    	}
	    	else {
	    		d.radius = 35 * self.data.links[d.index - 1].value;
	    		return Math.abs(d.radius - 5);
	    	}
	    }); 

		node.append("circle")
			.attr("r", 30)
			.attr("r", function(d){
				if(d.index == 0){
					d.radius = 50;
					return d.radius;
				}
				else {
					d.radius = 35 * self.data.links[d.index - 1].value;
					return d.radius;
				}
			})


		node.append("title")
		  .text(function(d) { return d.name; });



		node.append("image")
		      .attr("xlink:href", function(d) { return d.avatar; })
		      .attr("x", function(d){
		      	return -1*d.radius;
		      })
		      .attr("y", function(d){
		      	return -1*d.radius;
		      })
		      .attr("width", function(d){
		      	return d.radius*2;
		      })
		      .attr("height", function(d){
		      	return d.radius*2;
		      })
		      .attr("clip-path", function(d){
		      	return "url(#ellipse-clip" + d.index + ")";
		      });

		force.on("tick", function() {
		     link.attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });
		    
		    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); 
		});
		return this;
	}
}