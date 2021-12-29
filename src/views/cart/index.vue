<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { delCartData } from '../../api/cart'
import { useRouter } from 'vue-router'
import appFooterVue from '../../components/app-footer.vue'
import { Toast } from 'vant'
const store = useStore()
const router = useRouter()
const init = () => {
  store.dispatch('getCartList')
}
onMounted(() => {
  init()
})
const state = reactive({
  checked: true
})
const onSubmit = () => {
  router.push('/order/view')
}
const handleAllCheck = (el) => {
  console.log(store.getters.allChecked);
  store.dispatch('updateChecked', store.getters.allChecked)
}
const cart = computed(() => {
  return store.state.cartList.find(item => item.is_checked === 1 || true)
})
const onClickDelete = () => {
  delCartData(cart.value.id).then(res => {
    console.log(res);
    if (res.status == 204) return Toast.success('删除商品成功')
  })
}
</script>
<template>
  <div>
    <van-cell-group
      v-if="store.state.cartList.length !== 0"
      v-for="item in store.state.cartList"
      :key="item.id"
      inset
    >
      <van-cell>
        <template #title>
          <div>
            <van-card
              :num="item.num"
              tag="标签"
              :price="item.goods.price.toFixed(2)"
              :desc="'规格：' + item.goods.description"
              :title="item.goods.title"
              :thumb="item.goods.cover_url"
              :origin-price="99 + '.00'"
            />
          </div>
        </template>
        <template #right-icon>
          <van-checkbox v-model="item.is_checked" :name="item" @click.stop />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="kong" v-else>
      <van-empty description="暂无商品">
        <van-button round type="danger" class="bottom-button" @click="router.push('/')">goShopping</van-button>
      </van-empty>
    </div>
    <div class="sub">
      <van-submit-bar :price="store.getters.totalPrice" button-text="提交订单" @submit="onSubmit">
        <template #tip>
          不想要的就删了吧,
          <span @click="onClickDelete">删除商品</span>
        </template>
        <van-checkbox :modelValue="store.getters.allChecked" @click="handleAllCheck">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <appFooterVue />
  </div>
</template>
<style scoped lang='less'>
.bottom-button {
  width: 160px;
  height: 40px;
}
.van-submit-bar {
  margin-bottom: 50px;
}
:deep(.van-card__price) {
  color: var(--color-tint);
}
.van-cell-group {
  width: 100%;
  margin: 0;
  .van-cell {
    width: 100%;
    border-bottom: 1px solid #ccc;
  }
}
</style>