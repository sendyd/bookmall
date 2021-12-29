import http from '@/utils/http.js'

export function getHomeData(data) {
  return http.get('/api/index' , data  )
}

