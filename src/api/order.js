
import http from '@/utils/http.js'

export function getOrderView() {
  return http.get('/api/orders/preview'  )
}
export function submitOrder(data) {
  return http.post('/api/orders' ,data  )
}

export function getCode(id,data) {
  return http.get(`/api/orders/${id}/pay` ,data )
}

export function getPayStatus(id) {
  return http.get(`/api/orders/${id}/status`  )
}


export function getOrdersList(data) {
  return http.get('/api/orders' , data  )
}

