var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var old_endpoint = "https://api.twitch.tv/kraken";
var base_url = "https://wind-bow.gomix.me/twitch-api/";
var channels = "https://wind-bow.glitch.me/twitch-api/channels/";
var twitch_url = "https://www.twitch.tv/";

var deleteToggle = false;
var isTableSorted = [false, false]; // which column is sorted? 
var reverseSort = false;

// TODO list
//	- sort table
//		- also reverse
//	- delete row
//	- add row (add user to display)
//	- save user table data in local cache
// Optional
//	- any ways to make json calls synchronous
//	  so the code after the call has to wait for 
//	  the function call to complete?

// When user clicks the "Delete" option, this function
// is activated. It sets the deleteToggle variable
// to true
function setDelete(){
	deleteToggle = true;
	console.log("getting ready to delete");
}

// Got this function from W3 schools website
// It looks like a bubble sort
function sortTable(column) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("streamers");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      //check if the two rows should switch place:
	  if(!reverseSort){
		  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			//if so, mark as a switch and break the loop:
			shouldSwitch= true;
			break;
		  }
	  }else{
		  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			//if so, mark as a switch and break the loop:
			shouldSwitch= true;
			break;
		  }
	  }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  reverseSort = !reverseSort;
}

$(document).ready(function main(){
	$("#deleteUser").click(setDelete);
	$("#name_column").click(function(){sortTable(0)});
	
	
	for(var i=0; i<usernames.length; i++){
		let twitch_name = usernames[i];
		let user_account_url = twitch_url + twitch_name;
		var json_url = base_url + "streams/" + twitch_name + "?callback=?";
		// Asynchronous, so can't put data into list (I tried that)
		// The table will directly append the row
		$.getJSON(json_url, function parse(json){
			//console.log(json.stream);
			var stream_info = json.stream;
			var user_url_html = "<a href='" + user_account_url + "' target=_>" + twitch_name + "</a>"; 
			if(stream_info){ // if there is a stream
				$('#streamers').append("<tr><td>" + user_url_html + "</td><td>" + stream_info['channel']['status'] + "</td></tr>");
			}else{ // there is no stream
				$('#streamers').append("<tr><td>" + user_url_html + "</td><td>Offline</td></tr>");
			}
		});
	}

});




/*

// Adds a new streamer to the list in sorted order (ascending).
// This is insertion sort. It is also an online algorithm, 
// since taking in input one at a time.
function insertStreamer(streamer_list, streamer_obj){
	if(streamer_list.length == 0){
		streamer_list.push(streamer_obj);
		return;
	}
	// just to allocate that extra space in the array
	streamer_list.push(streamer_obj);
	// now the sort
	var obj_name = streamer_obj.name.toLowerCase();
	for(var i=streamer_list.length-2; i>=0; i--){
		var element_name = streamer_list[i].name.toLowerCase();
		if(element_name >= obj_name){
			streamer_list[i+1] = streamer_list[i];
			if(i==0){
				streamer_list[i] = streamer_obj;
			}
		}else{
			streamer_list[i+1] = streamer_obj;
			break;
		}
	}
}

function temp(streamer_list, obj_name){
	// just to allocate that extra space in the array
	streamer_list.push(obj_name);
	if(streamer_list.length == 1)
		return;
	var temp_name = obj_name.toLowerCase();
	// now the sort
	for(var i=streamer_list.length-2; i>=0; i--){
		var element_name = streamer_list[i].toLowerCase();
		console.log("comparing " + element_name + " to " + temp_name + " " + (element_name >= temp_name));
		if(element_name >= temp_name){
			streamer_list[i+1] = streamer_list[i];
			if(i==0)
				streamer_list[i] = obj_name;
		}else{
			streamer_list[i+1] = obj_name;
			break;
		}
	}
}

*/