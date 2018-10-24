window.data = null;
chrome.browserAction.onClicked.addListener(function(tab){
    var newURL = "https://segmentfault.com/";
    chrome.tabs.create({ url: newURL });
});


