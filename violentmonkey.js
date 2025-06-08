// ==UserScript==
// @name        Download video-audio button
// @namespace   github.com/kiriles90
// @version     3.0
// @date        2023-06-10
// @author      github.com/kiriles90
// @updateURL   https://raw.githubusercontent.com/kiriles90/Download-video-audio-button/master/violentmonkey.js
// @downloadURL https://raw.githubusercontent.com/kiriles90/Download-video-audio-button/master/violentmonkey.js
// @include     *://*.youtube.com/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==
var AKoiMain = {
    vid: null,
    oldUrl: null,
    observer: null,
    DocOnLoad: function (o) {
        try {
            if (o && o.body && o.location && (AKoiMain.vid = AKoiMain.getVid(o))) {
                var d = o.getElementsByClassName('ytd-download-button-renderer')[0]?.parentNode;
                if (!d) return;
                if (!o.querySelector("#y2mateconverter")) {
                    var n = AKoiMain.GetCommandButton();
                    d.style.display = "inline-block";
                }
                AKoiMain.oldUrl = o.location.href;
                AKoiMain.watchUrlChange();
            }
        } catch (e) {}
    },
    watchUrlChange: function () {
        if (AKoiMain.observer) AKoiMain.observer.disconnect();
        AKoiMain.observer = new MutationObserver(() => {
            if (AKoiMain.oldUrl !== window.location.href) {
                AKoiMain.oldUrl = window.location.href;
                AKoiMain.WaitLoadDom(window.document);
            }
        });
        AKoiMain.observer.observe(document.body, { childList: true, subtree: true });
    },
    WaitLoadDom: function (o) {
        AKoiMain.vid = AKoiMain.getVid(o);
        if (!AKoiMain.vid) {
            setTimeout(() => AKoiMain.WaitLoadDom(o), 500);
            return;
        }
        if (o.querySelector("#actions-inner")) {
            AKoiMain.DocOnLoad(o);
        } else {
            setTimeout(() => AKoiMain.WaitLoadDom(o), 500);
        }
    },
    goToY2mate: function (e) {
        e.stopPropagation();
        try {
            var url = `https://y2mate.com/youtube-mp3/${AKoiMain.vid}/?utm_source=chrome_addon`;
            window.open(url, "_blank");
        } catch (e) {}
    },
    GetCommandButton: function () {
        try {
            var o = document.getElementsByTagName("ytd-download-button-renderer")[0];
            o.id = "y2mateconverter";
            o.style.display = "inline-block";
            o.addEventListener("click", AKoiMain.goToY2mate, true);
            return o;
        } catch (e) {}
    },
    getVid: function (o) {
        var t = o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);
        return t && t[3];
    },
};
AKoiMain.WaitLoadDom(window.document);
