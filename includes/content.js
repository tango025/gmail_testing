// window.open('https://www.atg.party/');
console.log('extension invoked');
window.onerror = function (message, url, line, col, error) {
	this.console.log(message)
}

sleep_timer = 5000;
var email_arr = [];
var fb_post_s_link_array = [];
var while_loop_count = 2;
email_return_arr = [];
phone_return_arr = [];
url_return_arr = [];
function main_fx(request, sender, sendResponse) {
	var ko = 1;
if (request.greeting == "send_email"){
	var key = Object.keys(request.emailArr)[0];
	var emailList = request.emailArr[key][0];
	var emailArray = request.emailArr[key];
	console.log(++ko);
	setTimeout(()=>{
		for(var k=1;k<emailArray.length;k++){
			emailList += "," + emailArray[k];
		}
		if(ko==2){
			document.getElementById(":5v").value = emailList;//enter the email array
			document.getElementById(":6i").innerHTML = "hello from ATG.world "+key;//adding message
			document.getElementById(":53").click()//click send
			console.log("sent");
		}
	},10000);
	setTimeout(()=>{
		chrome.runtime.sendMessage({ 'send_email_response': 'email_sent' }, function (response) {
			console.log(`mess2222cvackground`);
		});
	},15000);
}
}

if (!chrome.runtime.onMessage.hasListener(main_fx)) {
  chrome.runtime.onMessage.addListener(main_fx);
}
