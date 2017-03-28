// This template uses d3-selection and d3-transition
// Importing d3-transition adds the .transition() method to selections
import { select, event } from "d3-selection";
import "d3-transition";

import Popup from "@flourish/popup";

// Anything the end user can configure in the settings panel must be in
// this object. The settings in template.yml reference these property names.
export var state = {
	color: "#4f24ff",
	opacity: 0.5
};

// Flourish puts the data in here
export var data = {};

var w, h, svg, popup = Popup();

// Initialise the graphic
export function draw() {
	w = window.innerWidth;
	h = window.innerHeight;
	svg = select(document.body).append("svg").attr("width", w).attr("height", h)
		.on("click", function() { popup.hide(); });
	update();

	// Redraw everything if the window is resized
	window.addEventListener("resize", function() {
		select("svg").remove();
		draw();
	});
}

// The update function is called when the user changes a state property in
// the settings panel or presentation editor. It updates elements to reflect
// the current state.
export function update() {
	if (state.opacity < 0 || state.opacity > 1) {
		throw new Error("Opacity must be between 0 and 1");
	}

	var circles = svg.selectAll("circle").data(data.circles);

	circles = circles.enter().append("circle")
		.on("click", function(d) {
			popup.point(d.x * w, d.y * h).html(d.word).draw();
			event.stopPropagation();
		})
		.merge(circles);

	circles.transition()
		.attr("fill", state.color)
		.attr("opacity", state.opacity)
		.attr("cx", function(d) { return d.x * w; })
		.attr("cy", function(d) { return d.y * h; })
		.attr("r", function(d) { return Math.sqrt(d.size); });

	circles.exit().remove();
}
