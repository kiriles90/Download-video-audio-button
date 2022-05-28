// ==UserScript==
// @name        Download video-audio button
// @namespace   github.com/kiriles90
// @version     1.5
// @date        2022-05-28
// @author      github.com/kiriles90
// @homepage    https://y2mate.com/
// @updateURL   https://raw.githubusercontent.com/kiriles90/Download-video-audio-button/master/violentmonkey.js
// @downloadURL https://raw.githubusercontent.com/kiriles90/Download-video-audio-button/master/violentmonkey.js
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @run-at      document-idle
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// @connect     youtube.com
// @connect     m.youtube.com
// @connect     www.youtube.com
// @connect     youtube-nocookie.com
// @connect     youtu.be
// @connect     y2mate.com
// @connect     self
// @connect     *
// ==/UserScript==
var AKoiMain={oXHttpReq:null,vid:null,oldUrl:null,DocOnLoad:function(o){try{if(null!=o&&null!=o.body&&null!=o.location&&(AKoiMain.vid=AKoiMain.getVid(o),AKoiMain.vid)){o.querySelector("#actions-inner").setAttribute("style","flex-wrap: wrap;");var t=o.querySelector("#actions-inner"),e=o.querySelector("#y2mateconverter"),n=AKoiMain.GetCommandButton();null==e&&(null!=t?t.parentNode.insertBefore(n,t):(t=o.querySelector("#eow-title")).parentNode.insertBefore(n,t)),AKoiMain.oldUrl=o.location.href,AKoiMain.checkChangeVid()}return!0}catch(o){console.log("Y2mate.DocOnLoad. ",o)}},checkChangeVid:function(){setTimeout(function(){AKoiMain.oldUrl==window.location.href?AKoiMain.checkChangeVid():AKoiMain.WaitLoadDom(window.document)},1e3)},WaitLoadDom:function(o){AKoiMain.vid=AKoiMain.getVid(o),AKoiMain.vid?null!=o.querySelector("#actions-inner")?AKoiMain.DocOnLoad(o):setTimeout(function(){AKoiMain.WaitLoadDom(o)},1e3):AKoiMain.checkChangeVid()},goToY2mate:function(o){try{var t="https://y2mate.com/youtube-mp3/"+AKoiMain.vid+"/?utm_source=chrome_addon";window.open(t,"_blank")}catch(o){console.log("Y2mate.OnButtonClick. ",o)}},GetCommandButton:function(){try{var o=document.createElement("button");return o.id="y2mateconverter",o.className="style-scope ytd-toggle-button-renderer style-text",o.setAttribute("type","button"),o.setAttribute("title","Download video / audio"),o.innerHTML="&#x1F4E5;",o.addEventListener("click",function(o){AKoiMain.goToY2mate(o)},!0),o.setAttribute("style","min-height:20px; position:relative; top:0px; cursor: pointer; font: 18px Arial; background: transparent; color: #030303; display: block; padding: 4px 6px; margin: -4px 14px 0px 5px; outline: 0px; border: 0px; border-radius: 2px; font-weight:bold"),o}catch(o){console.log("Y2mate.GetCommandButton. ",o)}},getVid:function(o){var t=o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);return!(!t||!t[3])&&t[3]}};AKoiMain.WaitLoadDom(window.document);
