import { createStore } from 'vuex'
import { getCartData } from '../api/cart';
export default createStore({
  state: {
    isLogin: false,
    cartList: []
  },
  actions: {
    updateLogin({ commit }, payload) {
      commit('setLogin', payload)
    },
    getCartList({ commit }, payload) {
      getCartData({ include: 'goods' }).then(res => {
        commit('setCartList', res.data)
      })
    },
    updateChecked({ commit }, payload) {
      commit('setChecked', payload)
    },
  },
  mutations: {
    //修改登录状态
    setLogin(state, payload) {
      state.isLogin = payload
    },
    //修改购物车列表数据
    setCartList(state, payload) {
      state.cartList = payload
    },
    setChecked(state, payload) {
      state.cartList.forEach(item => {
        item.is_checked = !payload
      })
    },
  },
  getters: {
    totalCount(state) {
      return state.cartList.reduce((total, todo) => {
        return total + todo.num === 0
      }, 0)
    },
    totalPrice(state) {
      return state.cartList.reduce((total, item) => {
        return total + (!!item.is_checked ? item.goods.price * item.num * 100 : 0) === 0 
      }, 0)
    },
    allChecked(state , getters) {
      return state.cartList.filter(item => item.is_checked).length === state.cartList.length && state.cartList.length !== 0 
    }
  },
  modules: {

  }
})