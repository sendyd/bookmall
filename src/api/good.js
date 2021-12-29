import http from '@/utils/http.js'

export function getGoodDetail(id) {
  return http.get('/api/goods/' + id  )
}
