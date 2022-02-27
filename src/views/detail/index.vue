<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Notify, Toast } from 'vant';
const route = useRoute()
const active = ref(0)
import { addCartData } from '../../api/cart';
import { getGoodDetail } from '../../api/good';
import { setCollect } from '@/api/collect'

onMounted(() => {
  init()
})
const init = () => {
  getGoodDetail(route.query.id).then(res => {
    // console.log(res);
    state.data = res.goods
    state.goods = res.like_goods
    state.is_collect = res.goods.is_collect === 1 ? true :false
  })
}
const state = reactive({
  data: { price: '' },
  goods: [],
  is_collect: false,
  show: false,
  value: 1
})
const handleCollect = () => {
  state.is_collect = !state.is_collect
  setCollect(route.query.id).then(res=>{
    // console.log(res);
    if(res.status === 201) {
      Toast.success('收藏成功')
    } else if(res.status === 204) {
      Toast.success('取消收藏成功')
    }
  })
}
const handleAddCart = () => {
  state.show = true
}
const showPrice = computed(() => {
  return state.value * state.data.price
})
const store = useStore()
const router = useRouter()
const addCart = () => {
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    Notify({ type: 'warning', message: '尚未登录' });
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
  addCartData({
    goods_id: route.query.id,
    num: state.value
  }).then(res => {
    if (res.status === 201 || res.status === 204) {
      Toast.success('加入购物车成功')
      state.show = false
    }
  })
  store.dispatch('getCartList')
}
</script>
<template>
  <div class="detail">
    <van-action-sheet v-model:show="state.show" :title="state.data.title">
      <div class="content">
        <van-field label="价格">
          <template #input>
            <span style="color:#ff5000">￥{{ showPrice }}</span>
          </template>
        </van-field>
        <van-field name="stepper" label="步进器">
          <template #input>
            <van-stepper v-model="state.value" />
          </template>
        </van-field>
        <van-action-bar>
          <van-action-bar-button @click="addCart" type="warning" text="加入购物车" />
        </van-action-bar>
      </div>
    </van-action-sheet>

    <img v-lazy="state.data.cover_url" alt />
    <div class="card">
      <van-card
        :price="state.data.price"
        :desc="state.data.description"
        :title="state.data.title"
        :thumb="state.data.cover_url"
      />
    </div>
    <van-tabs v-model:active="active">
      <van-tab title="详情">
        <div v-html="state.data.details"></div>
      </van-tab>
      <van-tab title="相似商品">
        <van-grid :column-num="2">
          <van-grid-item
            @click="$router.push({ path: '/detail', query: { id: item.id } })"
            v-for="item in state.goods "
            :key="item.id"
          >
            <img v-lazy="item.cover_url" alt />
            <span>{{ item.title }}</span>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
    <div class="footer">
      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-action-bar-icon
          :badge="$store.getters.totalCount"
          icon="cart-o"
          @click="$router.push('/cart')"
          text="购物车"
        />
        <van-action-bar-icon icon="star" @click="handleCollect" v-if="!state.is_collect" text="收藏" />
        <van-action-bar-icon
          icon="star"
          v-else="!state.is_collect"
          @click="handleCollect"
          text="已收藏"
          color="#ff5000"
        />
        <van-action-bar-button @click="handleAddCart" type="warning" text="加入购物车" />
        <van-action-bar-button type="danger" text="立即购买" />
      </van-action-bar>
    </div>
  </div>
</template>
<style scoped lang='less'>
.content {
  padding: 16px 16px 160px;
}
.footer {
  margin-top: 50px;
}
.detail {
  overflow: hidden;
  background-color: #f2f2f2;
}
.card {
  margin-top: 20px;
  background-color: #ccc;
  padding: 10px;
  .van-card {
    border-radius: 20px;
    :deep(.van-card__price) {
      color: var(--color-tint);
    }
  }
}
.van-grid {
  .van-grid-item {
    width: 50%;
    img {
      width: 100%;
    }
    span {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style>