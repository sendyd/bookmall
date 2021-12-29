import http from '@/utils/http'

export const getCategory = (data) => {
  return http.get('/api/goods' ,data)
}