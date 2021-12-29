import http from '@/utils/http.js'

export function goLogin(body) {
  return http.post('/api/auth/login', body)
}

export function goRegister(body) {
  return http.post('/api/auth/register', body)
}

export function getUserInfo() {
  return http.get('/api/user')
}
export function setUserInfo(data) {
  return http.put('/api/user' , data)
}

export function setAvatar(data) {
  return http.patch('/api/user/avatar' , data)
}