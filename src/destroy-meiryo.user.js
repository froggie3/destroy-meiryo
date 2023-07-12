// ==UserScript==
// @name           Destroy Meiryo
// @author         froggie3
// @description    A custom userstyle that replace some Meiryo or other cringy-looking fonts with BIZ UDPGothic.
// @downloadURL    https://github.com/froggie3/userscript/raw/main/src/destroy-meiryo.user.js
// @grant          none
// @homepage       https://github.com/froggie3/destroy-meiryo.git
// @match          *://*/*
// @run-at         document-start
// @source         https://github.com/froggie3/destroy-meiryo.git
// @supportURL     https://github.com/froggie3/destroy-meiryo.git
// @updateURL      https://github.com/froggie3/userscript/raw/main/src/destroy-meiryo.user.js
// @version        1.0.4.0
// ==/UserScript==

(() => {
    "use strict";

    const sansSerifElementsSelector = "tt, pre, code, kbd, samp, var, textarea";
    const sansSerifElementsSelector = `div, p, h1, h2, h3, h4, h5, h6, span, input, button, ul, ol :not(${sansSerifElementsSelector})`;
    const fontPreferences =
        '"Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif';
    const searchFonts = [
        /sans-serif/,
        /[Mm]eiryo/,
        /Hiragino Kaku/,
        /Yu\s?Gothic/,
        /MS PGothic/,
        /メイリオ/,
        /ヒラギノ角ゴ/,
        /游ゴシック/,
        /ＭＳ Ｐゴシック/,
    ];

    function applySansSerifFontToElements() {
        const sansSerifElements = document.querySelectorAll(
            sansSerifElementsSelector
        );
        sansSerifElements.forEach((element) => {
            const testFonts = getComputedStyle(element).fontFamily;
            for (const searchFont of searchFonts) {
                if (searchFont.test(testFonts)) {
                    element.style.fontFamily = fontPreferences;
                    break;
                }
            }
        });
    }

    function observeDOMChanges() {
        const observer = new MutationObserver(applySansSerifFontToElements);
        const targetNode = document.querySelector("body");
        if (targetNode) {
            observer.observe(targetNode, {
                attributes: false,
                childList: true,
                subtree: true,
            });
        }
    }

    document.addEventListener("DOMContentLoaded", observeDOMChanges);
})();
