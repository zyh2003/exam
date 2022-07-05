import http from './request'

function getCaptcha () {
  return http({ url: '/captcha', method: 'get' })
}
function login (params) {
  return http({
    url: `/login?username=${params.username}&password=${params.password}&code=${params.code}&token=${params.token}`,
    method: 'post'
  })
}
export { getCaptcha, login }
