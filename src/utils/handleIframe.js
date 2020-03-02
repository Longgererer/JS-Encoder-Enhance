/* eslint-disable */
import judgeUrlFormat from './judgeUrlFormat'
import * as createTags from './createTags'

function sendCodeToIframe (iframe, code, link, cdn) {
  const document = iframe.contentWindow.document
  const HTMLCode = code.HTMLCode
  const CSSCode = code.CSSCode
  const JSCode = code.JSCode
  // iframe元素可以获取，但是内部元素(body)可能还没有加载完成，因此要等待iframe加载完成再进行下面的操作
  document.body.innerHTML = HTMLCode
  // 在iframe中创建link外部链接
  if (link.length) {
    for (let item of link) {
      createTags.createLinkOrCDN(iframe, 'link', item)
    }
  }
  createTags.createLinkOrCDN(iframe, 'link', '../css/runner.css')
  // 判断iframe中是否存在用于存放用户编写css的style标签，将其删除再引入
  const runnerStyle = document.getElementById('JSEncoderRunnerCSS')
  if (runnerStyle) runnerStyle.parentNode.removeChild(runnerStyle)
  createTags.createStyleOrScript(iframe, 'style', 'JSEncoderRunnerCSS', CSSCode)
  // 在iframe中创建外部cdn
  if (cdn.length) {
    for (let item of cdn) {
      createTags.createLinkOrCDN(iframe, 'script', item)
    }
  }
  // 判断iframe中是否存在用于存放用户编写js的script标签，将其删除再引入
  const runnerScript = document.getElementById('JSEncoderRunnerJS')
  if (runnerScript) runnerScript.parentNode.removeChild(runnerScript)
  createTags.createStyleOrScript(iframe, 'script', 'JSEncoderRunnerJS', JSCode)
}

function refresh (iframe) {
  iframe.contentWindow.location.reload(true)
}

export default {
  sendCodeToIframe,
  refresh
}