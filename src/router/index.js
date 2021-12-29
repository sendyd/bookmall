import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('../views/home/index.vue')
const Category = () => import('../views/category/index.vue')
const Cart = () => import('../views/cart/index.vue')
const User = () => import('../views/user/index.vue')
const Detail = () => import('../views/detail/index.vue')
const Login = () => import('../views/user/components/login.vue')
const Register = () => import('../views/user/components/register.vue')
const OrderView = () => import('../views/order/index.vue')
const AddressAdd = () => import('../views/address/components/address-add.vue')
const Pay = () => import('../views/pay/index.vue')
const EditUserInfo = () => import('../views/user/components/editUserInfo.vue')
const OrderList = () => import('../views/order/components/order-list.vue')
const AddressList = () => import('../views/address/index.vue')
const AddressEdit = () => import('../views/address/components/address-edit.vue')
const CollectList = () => import('../views/collect/index.vue')
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '图书商城'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '图书分类'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/order/view',
    component: OrderView,
    meta: {
      title: '订单预览'
    }
  },
  {
    path: '/address/add',
    component: AddressAdd,
    meta: {
      title: '添加地址'
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: {
      title: '支付页面'
    }
  },
  {
    path: '/user/edit',
    component: EditUserInfo,
    meta: {
      title: '账号管理'
    }
  },
  {
    path: '/order/list',
    component: OrderList,
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/address/list',
    component: AddressList,
    meta: {
      title: '地址管理'
    }
  },
  {
    path: '/address/edit',
    component: AddressEdit,
    meta: {
      title: '编辑地址'
    }
  },
  {
    path: '/collect/list',
    component: CollectList,
    meta: {
      title: '我的收藏'
    }
  },


]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next) => {
  document.title = to.meta.title  
  next()
})

export default router