<script setup>
import { ref ,reactive, onBeforeMount, onMounted , computed ,defineProps,watch} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { getCode , getPayStatus} from '../../api/order'
import { useRouter ,useRoute } from 'vue-router'
import { Toast } from 'vant'
const router = useRouter()
const route = useRoute()
onMounted(() => {
init()
})
const init = () => {
  getCode(route.query.id , {type:'aliyun'}).then(res=>{
    console.log(res);
    state.imgUrl = res.qr_code_url
  })
  getPayStatus(route.query.id).then(res=>{
   if(res === 2) {
     Toast.success('支付成功')
     router.push('/orderList')
   }
  })
}
const state = reactive({
  imgUrl:''
})
</script>
<template>
  <div class="pay">
    <span>扫描二维码支付</span>
    <img v-lazy="state.imgUrl" alt="">
  </div>
</template>
<style scoped lang='less'>
.pay{
  
  width: 100%;
  height: 100vh;
  text-align: center;
  img{
  }
  span{
    display: block;
    margin-top: 50%;
  }
}
</style>