import html2canvas from 'html2canvas'
import axios from 'axios'
import { get } from './request'

function getIframeImage (dom, callback) {
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 333
  const content = canvas.getContext("2d")
  content.translate(-4,-11) // 画布偏移量
  html2canvas(dom, {
    backgroundColor: null,
    useCORS: true,
    allowTaint: true,
    scale: 0.5,
    canvas,
    logging: true
  }).then(canvas => {
    callback(canvas.toDataURL("image/jpg"))
  })
}

async function getToken () {
  let token = ''
  await get('/jsEncoder/project/token', {}).then(res => {
    token = res
  })
  return token
}

async function sendImageToQiNiuYun (dataURL, token) {
  const file = dataURLtoFile(dataURL)
  const param = new FormData()
  let imageUrl = 'http://images.lliiooiill.cn/'
  param.append("file", file)
  param.append("token", token)
  await axios({
    method: 'post',
    url: '/qiNiu',
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'UpToken ' + token
    }
  }).then(res => {
    imageUrl = imageUrl + res.data.key
  })
  return imageUrl
}

function dataURLtoFile (dataURL, filename = 'file') {
  let arr = dataURL.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}

export default {
  getIframeImage,
  getToken,
  sendImageToQiNiuYun
}