<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { getOrdersList } from '../../../api/order'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getOrdersList({ status: state.active + 1, include: 'goods' }).then(res => {
    // console.log(res);
    state.list = res.data
  })
}
const state = reactive({
  active: 0,
  tabs: ['下单', '支付', '发货', '收货', '过期'],
  list: [{ goods: { data: [{price:'',cover_url:'',description:''}] } }]
})
const clickTab = (val) => {
  // console.log(val);
  state.active  = val.name
  init()
}
</script>
<template>
  <div>
    <van-tabs @click-tab="clickTab" v-model:active="state.active">
      <van-tab v-for="(item ,index) in state.tabs" :title="item">
        <van-card
          v-for="item in state.list"
          :price="item.goods.data[0].price"
          :desc="item.goods.data[0].description"
          :title="item.goods.data[0].title"
          :thumb="item.goods.data[0].cover_url"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>
<style scoped lang='less'>
:deep(.van-card__price){
  color: var(--color-tint);
}
</style>