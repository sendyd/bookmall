<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { getOrderView, submitOrder } from '../../api/order'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getOrderView().then(res => {
    console.log(res);
    state.order = res
    state.order.address = res.address
  })
}

const addAddress = () => {
  // console.log('add');
  router.push('/address/add')
}
const state = reactive({
  text: '添加联系地址',
  order: { address: [], carts: [] }
})
const onSubmit = () => {
  console.log('sub');
  if (state.order.address.length === 0) {
    Toast.fail('请先填写地址');
  }
  submitOrder({ address_id: showAddress.value.id }).then(res => {
    // console.log(res);
    router.push({path:'/pay',query:{id:res.id}})
  })
}
const showAddress = computed(() => {

  return state.order.address.find(item => item.is_default === 1)
})
const showTotalPrice = computed(() => {
  return state.order.carts.reduce((num, item) => {
    return num + item.goods.price * item.num * 100
  }, 0)
})
</script>
<template>
  <div>
    <div class="address-wrap" v-if="state.order.address.length !== 0">
      <div class="name" @click="goTo">
        <span>{{ showAddress.name }}</span>
        <span>{{ showAddress.phone }}</span>
      </div>
      <div
        class="address"
        v-if="showAddress.province === showAddress.city"
      >{{ showAddress.province }}{{ showAddress.county }}</div>
      <div class="address" v-else>{{ showAddress.province }}{{ showAddress.city }}{{ showAddress.county }}</div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="address-wrap" v-else>
      <div class="name" @click="addAddress" style="display:flex;align-items:center">
        <van-button icon="plus" type="primary" size="normal" />
        <span style="margin-left:10px;font-size:28px;">添加联系地址</span>
      </div>

      <van-icon class="arrow" name="arrow" />
    </div>
    <van-card
      v-for="item in state.order.carts"
      :num="item.num"
      :price="item.goods.price"
      :desc="item.updated_at"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
    />
    <van-submit-bar :price="showTotalPrice" button-text="提交订单" @submit="onSubmit">
      <template #tip v-if="state.order.address.length === 0">
        你的收货地址不支持配送,
        <span @click="onClickLink">添加地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>
<style scoped lang='less'>
.van-card {
  border-bottom: 1px solid #ccc;
  :deep(.van-card__price) {
    color: #ff6c6c;
  }
}
.address-wrap {
  margin-bottom: 20px;
  background: #fff;
  position: relative;
  font-size: 14px;
  padding: 15px;
  color: #222333;
  .name,
  .address {
    margin: 10px 0;
  }
  .arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }
  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
    content: "";
  }
}
</style>