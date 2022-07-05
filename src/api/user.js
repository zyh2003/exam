import http from './request'

async function getCaptcha() {
  const { data } = await http.get('/captcha')
  return data
}
export { getCaptcha }
