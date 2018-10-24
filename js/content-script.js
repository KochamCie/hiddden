$(function () {
    console.log("content script js in !!!!")
    console.log(localStorage)
    console.log(localStorage.getItem("HIDDDEN"))
    clean(localStorage.getItem("HIDDDEN"));
})

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(chrome)
        console.log(request);
        localStorage.setItem("HIDDDEN", request.HIDDDEN)
        sendResponse("OK");
        clean(localStorage.getItem("HIDDDEN"));

    }
);


function clean(key){
    $(key.split(",")).each(function(k, v){
        console.log(k, v)
        $("#"+v).hide();
        $("."+v).hide();
    })
}

