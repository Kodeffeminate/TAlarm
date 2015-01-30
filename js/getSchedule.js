//GLOBAL VARIABLE
//Map to store the stopId of a given stop name
var stopIdByNameMap = new Object();

function getStopInfo(form) {
    var fromStop = form.fromStop.value;
    alert ("You typed: " + fromStop);
	var toStop = form.toStop.value;
	var stopId = stopIdByNameMap[toStop];
	alert(stopId);
	//70094
	var url = "http://realtime.mbta.com/developer/api/v2/schedulebystop?api_key=wX9NwuHnZU2ToO7GmGR9uw&stop="+stopId+"&route=931_&format=json";
$.getJSON(url,function(data){
	
});
}

function getStopDetails(document,$){
$.getJSON("http://realtime.mbta.com/developer/api/v2/stopsbyroute?api_key=wX9NwuHnZU2ToO7GmGR9uw&route=931_&format=json",
function(data) {
	var direction = data.direction;
	var fromOptions =[];
	var toOptions =[];
	var fromStops = direction[0].stop;
	var toStops = direction[1].stop;
	for(var j in fromStops){
		var stopName = fromStops[j].stop_name;
		var stopId = fromStops[j].stop_id;
		stopIdByNameMap[stopName] = stopId;
		fromOptions.push('<option value="',stopName,'">',
		stopName, '</option>');
	}
	$('#fromOptions').html(fromOptions.join(''));
	
	for(var k in toStops){
		var stopName = toStops[k].stop_name;
		var stopId = toStops[k].stop_id;
		stopIdByNameMap[stopName] = stopId;
		//alert(stopNames);
		toOptions.push('<option value="',stopName,'">',
		stopName, '</option>');
	}
	$('#toOptions').html(toOptions.join(''));
	
});
}
