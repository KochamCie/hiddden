const Plugin = {

    domainUrl: '',
    tabId: '',

    initButton: function () {
        // 当前激活窗口
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var tab = tabs[0];
            var tabUrl = tab.url;
            var domain = getDomain(tabUrl); // domain
            console.log(domain)
            Plugin.domainUrl = domain;
            $(".headeri").text(domain)
            Plugin.tabId = tab.id;
            var items = localStorage.getItem(domain)
            console.log("get Storage is : " + items)
            if (items) {
                $(items.split(",")).each(function (k, v) {
                    console.log(k, v)
                    renderNewItem(v);
                })
            }

        });
    },


    bindEvent: function () {
        var that = this;
        $(".new-item-btn").bind('click', function () {
            $(".new-item").show();
            $(".new-item-input").focus();
            $(".new-item-btn").hide();
        })

        $('.new-item-input').bind('keydown', function (event) {
            if (event.keyCode == "13") {
                $('.new-item-input').blur();
            }
        });

        $(".new-item-input").bind('blur', function () {
            $(".new-item").hide();
            $(".new-item-btn").show();
            var exist = false;
            var newItem = $(".new-item-input").val();

            // item exist?
            $("#items .el-tag").each(function () {
                console.log($(this).text())
                var item = $(this).text();
                if (newItem === item) {
                    exist = true;
                    return
                }
            })

            if (exist) {
                return;
            }

            renderNewItem(newItem)
            // send save single item message
            var domain = Plugin.domainUrl; // storage key
            that.appendStorage(domain, newItem);
            that.sendMessage('save');
        })

        // delete single
        $("#items").bind('click', function (e, t, n) {
            if (event.target.className == "el-tag__close el-icon-close") {
                // send remove single item message
                var single = $(event.target).parent('.el-tag').text();
                $(event.target).parent('.el-tag').remove();
                // remove item in storage
                that.removeSingleItem(single)
                that.sendMessage('removesingle', single)
            }
        })

        $(".clear-item-btn").bind('click', function () {
            $("#items").html('');
            that.removeStorage(Plugin.domainUrl)
            // send remove all items message
            that.sendMessage("removeall")
        })

    },
    sendMessage: function (action, single) {
        var that = this;
        var tabId = Plugin.tabId;
        var domain = Plugin.domainUrl; // storage key
        chrome.tabs.sendMessage(tabId, {
            action: action,
            "itemk": domain,
            "itemv": that.getStorage(domain),
            "single": single
        }, function (response) {
            var win = chrome.extension.getBackgroundPage();
            win.data = response;
            console.log(response);
            that.clearInput();
        });

    },

    // 读
    getStorage: function (key) {
        var _value = localStorage.getItem(key);
        return _value;
    },

    // 存
    appendStorage: function (key, value) {

        var _value = this.getStorage(key);
        if (_value) {
            _value = _value + ',' + value;
        } else {
            _value = value;
        }
        localStorage.setItem(key, _value);

    },
    // remove all items in storage
    removeStorage: function (key) {
        localStorage.removeItem(key);
    },

    // remove single item in storage
    removeSingleItem: function (key) {
        var before = localStorage.getItem(Plugin.domainUrl);
        if (before) {
            var temp = [];
            before.split(",").forEach(function (t) {
                if (t != key) {
                    temp.push(t);
                }
            })
            console.log(temp.join(','));
            localStorage.setItem(Plugin.domainUrl, temp.join(','))
        }
    },


    // 清空 input
    clearInput: function () {
        $(".new-item-input").val('');
    },

    init: function () {
        this.initButton();
        this.bindEvent();
    }

};


$(function () {
    console.log("plugin in")
    Plugin.init()
    $(".new-item").hide();
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

function renderNewItem(newInput) {
    var itemsArea = $("#items")
    var html = '<span class="el-tag">' + newInput + '<i class="el-tag__close el-icon-close"></i></span>';
    $(html).appendTo(itemsArea)

}

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};