const Plugin = {

    initButton: function () {
        var that = this;
        str = that.getStorage("HIDDDEN");
        console.log(localStorage)
        console.log("get Storage HIDDDEN is : " + str)
    },


    bindEvent: function () {

        //添加按钮  展示输入面板
        $("#showAddBtn").bind("click", function () {
            $(".add-area").show();
            $("#showAddBtn").hide();
        })


        //取消按钮  隐藏输入面板
        $("#cancelBtn").bind("click", function () {
            location.reload();
        })
        var that = this;
        //确认按钮
        $("#confirmBtn").bind("click", function () {


            that.clearInput();
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                var tab = tabs[0];
                var tabUrl = tab.url;
                var tabId = tab.id;
                var domain = getDomain(tabUrl); // storage key
                var keyword = $("#hidden-key").val();
                that.setStorage(domain, keyword);
                chrome.tabs.sendMessage(tabId, {
                    action: "clean",
                    "itemk": domain,
                    "itemv": that.getStorage(domain)
                }, function (response) {
                    var win = chrome.extension.getBackgroundPage();
                    win.data = response;
                    console.log(response);
                });
            });
        })
    },


    // 读
    getStorage: function (key) {
        var _value = localStorage.getItem(key);
        return _value;
    },

    // 存
    setStorage: function (key, value) {

        var values = [];
        var _value = this.getStorage(key);
        null == _value ? false : values.push(_value)
        values.push(value)
        localStorage.setItem(key, values);

    },
    // 删
    removeStorage: function (key) {
        localStorage.removeItem(key);
    },

    // 清空 input
    clearInput: function () {

    },

    init: function () {
        this.initButton();
        this.bindEvent();
    }

};


$(function () {
    console.log("plugin in")
    Plugin.init()
    $(".newitem").hide();
    $(".success").click(function(){
        $(".newitem").show();
        $(".el-input__inner").focus();
        $(".success").hide();
    })


    $(".el-input__inner").blur(function(){
        $(".newitem").hide();
        $(".success").show();
    });
});

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