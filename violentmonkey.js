// ==UserScript==
// @name        Download video-audio button
// @namespace   github.com/kiriles90
// @version     3.9
// @date        2025-06-29
// @author      github.com/kiriles90
// @updateURL   https://raw.githubusercontent.com/kiriles90/Download-video-audio-button/master/violentmonkey.js
// @downloadURL https://raw.githubusercontent.com/kiriles90/Download-video-audio-button/master/violentmonkey.js
// @match       *://*.youtube.com/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==
(() => {
    let vid, oldUrl, obs;
    const getVid = url => {
        const m = url.match(/(?:youtu\.be\/|(?:vi?|embed)\/|[?&]vi?=)([^#&?]+)/);
        return m ? m[1] : null;
    };
    const goToY2mate = e => {
        e.stopPropagation();
        window.open(`https://y2mate.best/convert/?videoId=${vid}`, '_blank');
    };
    const createButton = () => {
        const btn = document.querySelector('ytd-download-button-renderer');
        if (!btn || btn.id) return;
        btn.id = 'y2mateconverter';
        btn.style.display = 'inline-block';
        btn.addEventListener('click', goToY2mate, true);
    };
    const checkDom = () => {
        vid = getVid(location.href);
        if (!vid || !document.querySelector('#actions-inner')) return setTimeout(checkDom, 500);
        createButton();
        oldUrl = location.href;
        obs.disconnect();
        obs.observe(document.body, { childList: true, subtree: true });
    };
    obs = new MutationObserver(() => {
        if (oldUrl !== location.href) checkDom();
    });
    checkDom();
    const sheet=document.head.appendChild(document.createElement("style")).sheet;
    sheet.insertRule(".paper-toast-open, tp-yt-iron-overlay-backdrop, .annotation.annotation-type-custom.iv-branding{display:none!important}",0);
})();
