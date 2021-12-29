<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps } from 'vue'
const active = ref(0)
</script>
<template>
  <div class="footer">
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category" >分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart" :badge="$store.getters.totalCount">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user" >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style scoped lang='less'>
.footer {
  margin-top: 50px;
}
</style>