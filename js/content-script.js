$(function () {
    console.log("content script js in !!!!")
    hide(localStorage.getItem(getDomain(window.location.href)));
})

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("onMessage", request);
        var itemk = request.itemk;
        var itemv = request.itemv;
        var before = localStorage.getItem(itemk);
        localStorage.setItem(itemk, itemv)  // 保持一致
        if (request.action === 'save') {
            hide(localStorage.getItem(itemk));
        } else if (request.action === 'removeall') {
            show(before);
            localStorage.removeItem(itemk);
        } else if(request.action === 'removesingle'){
            var single = request.single;
            show(single)
        }
        sendResponse("OK");
    }
);


function hide(key) {
    if (!key) {
        return;
    }
    $(key.split(",")).each(function (k, v) {
        console.log(k, v)
        $("#" + v).hide();
        $("." + v).hide();
        $("#" + v).removeAttr("display");
        $("." + v).removeAttr("display");
    })
}


function show(key) {
    if (!key) {
        return;
    }
    $(key.split(",")).each(function (k, v) {
        console.log(k, v)
        $("#" + v).show();
        $("#" + v).removeAttr("display");
        $("." + v).show();
        $("." + v).removeAttr("display");
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
