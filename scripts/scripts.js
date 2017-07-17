$(document).ready(function() {

	setUpNavigationClickHandling();

	var nearEarthObjectData = fetchNearEarthObjectData();
	var nearEarthObjects = getNearEarthObjects(nearEarthObjectData);

	generateListing(nearEarthObjects);
});

function setUpNavigationClickHandling() {

	$("#listingLink").click(function() {
		updateNavigationSelection("listingLink");
	});

	$("#chartLink").click(function() {
		updateNavigationSelection("chartLink");
	});

	$("#aboutLink").click(function() {
		updateNavigationSelection("aboutLink");
	});
}

function updateNavigationSelection(selectedLink) {

	var children = $("nav").children();

	children.each(function() {
		if(this.id === selectedLink) {
			$(this).addClass('selected');
		} else {
			$(this).removeClass('selected');
		}
	});
}

function fetchNearEarthObjectData() {
	// Just returning test data for now
	return testData;
}

function getNearEarthObjects(nearEarthObjectData) {

	var nearEarthObjects = [];
	var dateGroupings = Object.keys(nearEarthObjectData.near_earth_objects);

	dateGroupings.forEach(function(grouping) {
		Array.prototype.push.apply(nearEarthObjects, nearEarthObjectData.near_earth_objects[grouping]);
	});

	return nearEarthObjects;
}

function generateListing(nearEarthObjects) {

	// Create an unordered list to contain entries
	var list = $('<ul/>').appendTo('#listingArea');

	nearEarthObjects.forEach(function(nearEarthObject) {
		list.append("<li>" + 
			"<h2>" + nearEarthObject.name.replace(/[\(\)]/g, '') + "</h2>" +
			"<p>Reference ID: <a href='" + nearEarthObject.nasa_jpl_url + "' target='_blank'>" + nearEarthObject.neo_reference_id + "</a></p>" +
			"<p>Estimated Diameter: Between " + nearEarthObject.estimated_diameter.meters.estimated_diameter_min + " and " + nearEarthObject.estimated_diameter.meters.estimated_diameter_max + " meters</p>" +
			"<p>Missed the earth by " + nearEarthObject.close_approach_data[0].miss_distance.kilometers + " kilometers today</p>" +
			"<p>Orbiting " + nearEarthObject.close_approach_data[0].orbiting_body + " at a rate of " + nearEarthObject.close_approach_data[0].relative_velocity.kilometers_per_second + " kilometers per second</p>" +
		"</li>");
		/*$('<div/>', {
			text: nearEarthObject.name
		}).appendTo('#listingArea');*/
	});
}