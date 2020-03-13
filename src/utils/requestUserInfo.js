import { post, get } from './request'
/**
 * 根据_id获取用户信息
 * @param String _id 
 * @return Object userInfo
 */
async function getUserInfo (_id) {
  let userInfo = {}
  await get('/jsEncoder/users/getUserInfo', {
    params: { _id }
  }).then(res => {
    userInfo = res
  })
  return userInfo
}
/**
 * 根据userId获取用户所有项目信息
 * @param String userId 
 * @return Array projectInfo
 */
async function getProjectInfo (userId) {
  let projectInfo = []
  await get('/jsEncoder/project/projectInfo', {
    params: { userId }
  }).then(res => {
    projectInfo = res
  })
  return projectInfo
}

export default {
  getUserInfo,
  getProjectInfo
}