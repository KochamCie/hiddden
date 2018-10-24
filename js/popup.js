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
            var keyword = $("#hidden-key").val();
            that.setStorage("HIDDDEN", keyword);
            that.clearInput();
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "clean",
                    "HIDDDEN": localStorage.getItem("HIDDDEN")
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
});
