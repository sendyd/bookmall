import http from '@/utils/http.js'

export function addCartData(data) {
  return http.post('/api/carts' , data  )
}

export function getCartData(data) {
  return http.get('/api/carts' , data )
}

export function delCartData(id) {
  return http.delete('/api/carts/'+ id)
}

