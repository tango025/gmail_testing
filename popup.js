
var global_email_arr =[{'yoga':['gaurav2550.gg@gmail.com','panka1234j@gmail.com']},{'market':['gaurav2550.gg@gmail.com','panka1234j@gmail.com']}];
var global_email_arr_loop_count = -1;
var global_email_arr_len;
var global_phone_arr =[];
email_return_arr = [];
phone_return_arr = [];
url_return_arr = [];
var activeTab;
function main_fx_backend(request, sender, sendResponse) {
  if ('send_email_response' in request){
    console.log(global_email_arr_loop_count+"/"+(global_email_arr_len-1))
    if(global_email_arr_loop_count<global_email_arr_len-1)
      send_Email(global_email_arr);
    else console.log("email_Over");  
  }
}
if (!chrome.runtime.onMessage.hasListener(main_fx_backend)) {
  chrome.runtime.onMessage.addListener(main_fx_backend);
}

function send_Email(email_arr) {
  console.log(email_arr);
  global_email_arr_loop_count++;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("navigating to https://mail.google.com/mail/u/0/#starred?compose=new");
    chrome.tabs.update(tabs[0].id, { url: "https://rebrand.ly/9175f" }, () => {
      activeTab = tabs[0].id;
      chrome.tabs.onUpdated.addListener(function kovalam(tabid, changedInfo, tab) {
        console.log("sending message");
        if (changedInfo.status == 'complete' && tab.status == 'complete' && tabid == activeTab) {
          chrome.tabs.sendMessage(tabs[0].id, { greeting: "send_email", emailArr: email_arr[global_email_arr_loop_count] }, function (response) {
            while (chrome.tabs.onUpdated.hasListener(kovalam) === true) {
              chrome.tabs.onUpdated.removeListener(kovalam);
            }
            console.log("page_loaded and information sent");
          })
        }
      })
    })
  })
}
function main() {
  global_email_arr_len = global_email_arr.length;
  send_Email(global_email_arr);
}
(function(){
  document.addEventListener('DOMContentLoaded', function() {
      document.querySelector('#submit').addEventListener(
        'click', main);
    })
  })();
