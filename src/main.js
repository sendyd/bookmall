import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import '../src/style/css/base.css'
import Vant from 'vant';
import { Lazyload } from 'vant'
import { DropdownMenu, DropdownItem } from 'vant';
import 'vant/lib/index.css';
import router from './router'
import store from './store'
import imgUrl from './assets/img/xiugou.jpg'
const app = createApp(App)
app
.use(store)
.use(router)
.use(Vant)
.use(Lazyload,{
  loading: imgUrl
})
.mount('#app')
