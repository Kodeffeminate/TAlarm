//GLOBAL VARIABLE
//Map to store the stopId of a given stop name
var stopIdByNameMap = new Object();
function getStopInfo(form) {
    var fromStop = form.fromStop.value;
	var toStop = form.toStop.value;
	var stopId = stopIdByNameMap[fromStop];
	//70094
	var url = "http://realtime.mbta.com/developer/api/v2/schedulebystop?api_key=wX9NwuHnZU2ToO7GmGR9uw&stop="+stopId+"&route=931_&format=json";
	var startTag="<TABLE id='mainTable'><TBODY><TR><TD style=\"WIDTH: 120px\">S.No</TD><TD style=\"WIDTH: 120px\">TRIP NAME ID</TD><TD style=\"WIDTH: 120px\">SCHEDULED ARRIVAL</TD></TR>";
	var endTag="</TBODY></TABLE>";
	var newTable=startTag;
$.getJSON(url,function(result){
	var tripInfo = result.mode[0].route[0].direction[0].trip;
	newTable+="<TR><TD>";
	for(var i in tripInfo){
		var tripName = tripInfo[i].trip_name;
		var arrivalEpochTime = tripInfo[i].sch_arr_dt;
		var arrivalTime = new Date(arrivalEpochTime);
		newTable+=i;
		newTable+="</TD><TD>";
		newTable+=tripName;
		newTable+="</TD><TD>";
		newTable+=arrivalTime;
		newTable+="</TD></TR>";
	}
	newTable+=endTag;	
});
alert("Done");
$('#content').html(newTable)
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
	document.preventDefault();
	
});
}


