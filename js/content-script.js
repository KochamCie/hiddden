$(function () {
    console.log("content script js in !!!!")
    clean(localStorage.getItem(getDomain(window.location.href)));
})

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("onMessage", request);
        if(request.action === 'clean'){
            var itemk = request.itemk;
            var itemv = request.itemv;
            console.log(itemk, itemv)
            localStorage.setItem(itemk, itemv)
            sendResponse("OK");
            clean(localStorage.getItem(itemk));
        }
    }
);


function clean(key){
    if(!key){
        return;
    }
    $(key.split(",")).each(function(k, v){
        console.log(k, v)
        $("#"+v).hide();
        $("."+v).hide();
    })
}

function getDomain(url) {
    var j = 0, startIndex = 0, endIndex = 0;
    for (var i = 0; i < url.length; i++) {
        if (url.charAt(i) == '/') {
            j++;
            if (j == 2)
                startIndex = i;
            else if (j == 3)
                endIndex = i;
        }

    }
    return url.substring(startIndex + 1, endIndex);
}
