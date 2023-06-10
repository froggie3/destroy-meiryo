// ==UserScript==
// @name           destroy-meiryo
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
// @version        1.0.0
// ==/UserScript==

(() => {
  'use strict'
  const toApplymonospace = 'tt, pre, code, kbd, samp, var, textarea'
  const toApplySansSerif = `div, p, h1, h2, h3, h4, h5, h6, span, input, button :not(${toApplymonospace})`
  const fontPreferences = '-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif'
  const searchFonts = [
    /sans-serif/, /[Mm]eiryo/, /Hiragino Kaku/, /Yu\s?Gothic/, /MS PGothic/, /メイリオ/,
    /ヒラギノ角ゴ/, /游ゴシック/, /ＭＳ Ｐゴシック/
  ]

  const observer = new MutationObserver(() => {
    const elementsToBeSansSerif = Array.from(document.querySelectorAll(toApplySansSerif))
    for (const i of elementsToBeSansSerif) {
      const testFonts = getComputedStyle(i).fontFamily
      for (const j of searchFonts) {
        if (j.test(testFonts)) {
          i.style.fontFamily = fontPreferences
          break
        }
      }
    }
  })

  observer.observe(document.getElementsByTagName('body')[0], {
    attributes: false,
    childList: true,
    subtree: true
  })

  /* Array.from(document.querySelectorAll(toApplymonospace)).map(x => {
      x.style.fontFamily = "monospace, 'BIZ UDGothic', !important";
  }); */
})()
