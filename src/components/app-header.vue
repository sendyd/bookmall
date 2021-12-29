<script setup>
import { ref, reactive, watch, onBeforeMount, onMounted, computed, defineProps, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
const state = reactive({
  title: ''
})

onMounted(() => {
  state.title = document.title
})

const route = useRoute()

watch(() => route.path, (a, b) => {
  if (a !== b) return state.title = document.title
})
</script>
<template>
  <div class="header">
    <van-nav-bar fixed title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="20" />
      </template>
      <template #title>
        <span>{{ state.title }}</span>
      </template>
      <template #left>
        <van-icon @click="$router.push('/')" name="wap-home-o" size="20" />
      </template>
    </van-nav-bar>
  </div>
</template>
<style scoped lang='less'>
.header {
  margin-bottom: 46px;
}
.van-nav-bar {
  background-color: #666666;
  background-image: url("https://cdn.pixabay.com/photo/2013/03/19/23/07/easter-bunny-95096_960_720.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  span {
    font-size: 20px;
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
</style>