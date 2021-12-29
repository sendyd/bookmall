<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps } from 'vue'
defineProps({
  data: {
    type: Array,
    default: []
  }
})
</script>
<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item @click="$router.push({path:'/detail',query:{id:item.id}})" v-for="item in data" :key="item.id">
        <img v-lazy="item.img_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style scoped lang='less'>
.van-swipe-item {
  height: 200px;
}
img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>