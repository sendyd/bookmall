
import http from '@/utils/http.js'

export function setCollect(id) {
  return http.post('/api/collects/goods/'+id)
}

export function getCollect() {
  return http.get('/api/collects')
}
