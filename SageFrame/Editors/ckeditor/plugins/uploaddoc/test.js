﻿(function () {

    function h(a, d, f) {
        var b = CKEDITOR.cleanWord;
        b ? f() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || d + "filter/default.js"),
        CKEDITOR.scriptLoader.load(a, f, null, !0));
        return !b
    }

    function k(a) {
        a.data.type = "html"
    }
    CKEDITOR.plugins.add("pastefromword", {
        requires: "clipboard",
        init: function (a) {
            var d = 0,
                f = this.path;
            a.addCommand("pastefromword", {
                canUndo: !1,
                async: !0,
                exec: function (a) {
                    var e = this;
                    d = 1;
                    a.once("beforePaste", k);
                    a.getClipboardData({
                        title: a.lang.pastefromword.title
                    }, function (c) {
                        c && a.fire("paste", {
                            type: "html",
                            dataValue: c.dataValue,
                            method: "paste",
                            dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer()
                        });
                        a.fire("afterCommandExec", {
                            name: "pastefromword",
                            command: e,
                            returnValue: !!c
                        })
                    })
                }
            });
            a.ui.addButton && a.ui.addButton("PasteFromWord", {
                label: a.lang.pastefromword.toolbar,
                command: "pastefromword",
                toolbar: "clipboard,50"
            });

            a.on("pasteState", function (b) {
                a.getCommand("pastefromword").setState(b.data)
            });

            a.on("paste", function (b) {
                var e = b.data,
                    c = e.dataValue;
                if (c && (d || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(c))) {
                    e.dontFilter = !0;
                    var g = h(a, f, function () {
                        if (g) a.fire("paste", e);
                        else if (!a.config.pasteFromWordPromptCleanup || d || confirm(a.lang.pastefromword.confirmCleanup)) e.dataValue = CKEDITOR.cleanWord(c, a);
                        d = 0
                    });
                    g && b.cancel()
                }
            }, null, null, 3)
        }
    })
})();