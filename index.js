// ==UserScript==
// @name         Link2Direct
// @namespace    https://github.com/nismison
// @version      0.1
// @description  知乎/简书链接转换为直链
// @author       Nismison
// @match        https://www.zhihu.com/*
// @match        https://www.jianshu.com/*
// ==/UserScript==

function getQueryVariable(url, variable) {
  // 获取url参数
  url = url.split('?')[1]
  const vars = url.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) { return pair[1]; }
  }
  return false;
}


(function() {
  'use strict';
  const curUrl = window.location.href
  if (curUrl.includes('https://www.jianshu.com')) {
    // 简书
    const links = document.querySelectorAll("a[href^='https://link.jianshu.com?t=']")
    for (let i = 0; i < links.length; i++) {
      const params = getQueryVariable(links[i].href, 't')
      const unescapeUrl = unescape(params)
      if (unescapeUrl) links[i].href = unescapeUrl
    }
  } else if (curUrl.includes('https://www.zhihu.com')) {
    // 知乎
    const links = document.querySelectorAll("a[href^='https://link.zhihu.com/?target=']")
    for (let i = 0; i < links.length; i++) {
      const params = getQueryVariable(links[i].href, 'target')
      const unescapeUrl = unescape(params)
      if (unescapeUrl) links[i].href = unescapeUrl
    }
  }
})();
