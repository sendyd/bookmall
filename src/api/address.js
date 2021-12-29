import http from '@/utils/http.js'

export function addAddress(data) {
  return http.post('/api/address' , data  )
}

export function getAddress() {
  return http.get('/api/address'  )
}

export function getAddressInfo(id) {
  return http.get('/api/address/' + id  )
}

export function editAddressInfo(id,data) {
  return http.put('/api/address/' + id  ,data)
}