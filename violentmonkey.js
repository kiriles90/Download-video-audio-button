// ==UserScript==
// @name        Download video-audio button
// @namespace   github.com/kiriles90
// @version     1.9
// @date        2022-11-20
// @author      github.com/kiriles90
// @homepage    https://y2mate.com/
// @updateURL   https://raw.githubusercontent.com/kiriles90/Download-video-audio-button/master/violentmonkey.js
// @downloadURL https://raw.githubusercontent.com/kiriles90/Download-video-audio-button/master/violentmonkey.js
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==
var AKoiMain = {
    oXHttpReq: null,
    vid: null,
    oldUrl: null,
    DocOnLoad: function (o) {
        try {
            if (null != o && null != o.body && null != o.location && ((AKoiMain.vid = AKoiMain.getVid(o)), AKoiMain.vid)) {
                o.querySelector("ytd-download-button-renderer").setAttribute("style", "display: inline-block; cursor: pointer;");
                o.querySelector("ytd-download-button-renderer").querySelector("ytd-button-renderer").setAttribute("style", "pointer-events: none");
                var e = o.querySelector("#y2mateconverter"),
                    n = AKoiMain.GetCommandButton();
                null == e, (AKoiMain.oldUrl = o.location.href), AKoiMain.checkChangeVid();
            }
            return !0;
        } catch (o) {}
    },
    checkChangeVid: function () {
        setTimeout(function () {
            AKoiMain.oldUrl == window.location.href ? AKoiMain.checkChangeVid() : AKoiMain.WaitLoadDom(window.document);
        }, 1e3);
    },
    WaitLoadDom: function (o) {
        (AKoiMain.vid = AKoiMain.getVid(o)),
            AKoiMain.vid
                ? null != o.querySelector("#actions-inner")
                    ? AKoiMain.DocOnLoad(o)
                    : setTimeout(function () {
                          AKoiMain.WaitLoadDom(o);
                      }, 1e3)
                : AKoiMain.checkChangeVid();
    },
    goToY2mate: function (o) {
        try {
            var t = "https://y2mate.com/youtube-mp3/" + AKoiMain.vid + "/?utm_source=chrome_addon";
            window.open(t, "_blank");
        } catch (o) {}
    },
    GetCommandButton: function () {
        try {
            var o = document.getElementsByTagName("ytd-download-button-renderer")[0];
            return (
                (o.id = "y2mateconverter"),
                o.addEventListener(
                    "click",
                    function (o) {
                        AKoiMain.goToY2mate(o);
                    },
                    !0
                ),
                o
            );
        } catch (o) {}
    },
    getVid: function (o) {
        var t = o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);
        return !(!t || !t[3]) && t[3];
    },
};
AKoiMain.WaitLoadDom(window.document);
