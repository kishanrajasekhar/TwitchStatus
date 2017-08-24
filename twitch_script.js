
var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var old_endpoint = "https://api.twitch.tv/kraken";
var base_url = "https://wind-bow.gomix.me/twitch-api/";
var channels = "https://wind-bow.glitch.me/twitch-api/channels/";
var twitch_url = "https://www.twitch.tv/";

$(document).ready(function main(){
	
	for(var i=0; i<usernames.length; i++){
		let name = usernames[i];
		let user_account_url = twitch_url + name;
		var json_url = base_url + "streams/" + name + "?callback=?";
		$.getJSON(json_url, function parse(json){
			console.log(json.stream);
			var stream_info = json.stream;
			var user_url_html = "<a href='" + user_account_url + "' target=_>" + name + "</a>"; 
			if(stream_info){ // if there is a stream
			
				$('#streamers').append("<tr><td>" + user_url_html + "</td><td>" + stream_info['channel']['status'] + "</td></tr>");
			}else{ // there is no stream
				$('#streamers').append("<tr><td>" + user_url_html + "</td><td>Offline</td></tr>");
			}
		});
	}
	
});