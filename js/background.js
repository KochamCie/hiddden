window.data = null;
// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.windows.getCurrent(function (win) {
//         chrome.tabs.getAllInWindow(win.id, function (tabs) {
//             var count = 0;
//             var current;
//             var target;
//             tabs.forEach(function (t) {
//                 if(t.active){
//                     current = t;
//                 }
//
//                 if ("hiddden" === t.title) {
//                     target = t;
//                     count++;
//                 }
//             })
//             if (count > 0) {
//                 if(current != target){
//                     chrome.tabs.update(null, {url:chrome.extension.getURL('popup.html')});
//                 }
//                 return;
//             }
//             chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function (tab) {
//                 console.log("opened")
//             });
//         });
//     });
// })
