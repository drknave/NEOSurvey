$(document).ready(function() {

	var asteroidData = fetchAsteroidData();
	var nearEarthObjects = getNearEarthObjects(asteroidData);
	createDomElements(nearEarthObjects);
});

function fetchAsteroidData() {
	// Just returning test data for now
	return testData;
}

function getNearEarthObjects(asteroidData) {

	var nearEarthObjects = [];
	var dateGroupings = Object.keys(asteroidData.near_earth_objects);

	dateGroupings.forEach(function(grouping) {
		Array.prototype.push.apply(nearEarthObjects, asteroidData.near_earth_objects[grouping]);
	});

	return nearEarthObjects;
}

function createDomElements(nearEarthObjects) {

	nearEarthObjects.forEach(function(nearEarthObject) {
		$('<div/>', {
			text: nearEarthObject.name
		}).appendTo('#attachPoint');
	});
}