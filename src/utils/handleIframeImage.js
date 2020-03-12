import html2canvas from 'html2canvas'
import axios from 'axios'
import { get } from './request'

function getIframeImage (dom, callback) {
  html2canvas(dom, {
    backgroundColor: null,
    useCORS: true,
    allowTaint: true,
    logging: true
  }).then(canvas => {
    callback(canvas.toDataURL("image/png"))
  })
}

async function getToken () {
  let token = ''
  await get('/jsEncoder/project/token', {}).then(res => {
    token = res
  })
  return token
}

function sendImageToQiNiuYun (dataURL, token, callback) {
  // 将图片发送给七牛云并获取链接
  const dataURLInfo = handleDataURL(dataURL)
  const url = '/qiNiu/putb64/' + dataURLInfo.fileSize
  axios({
    method: 'post',
    url,
    data: dataURLInfo.dataURL,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Authorization': 'UpToken ' + token
    }
  }).then(res => {
    callback('http://images.lliiooiill.cn/' + res.data.key)
  })
}

function handleDataURL (dataURL) {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const len = mime.length
  const subLen = parseInt(len + 13)
  dataURL = dataURL.substring(subLen)

  if (dataURL.indexOf('=') > 0) {
    const indexOf = dataURL.indexOf('=')
    dataURL = dataURL.substring(0, indexOf)
  }

  const fileSize = parseInt(dataURL.length - (dataURL.length / 8) * 2)
  return {
    fileSize,
    dataURL
  }
}
export default {
  getIframeImage,
  getToken,
  sendImageToQiNiuYun
}