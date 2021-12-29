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
  <div class="cate">
    <van-grid>
      <van-grid-item @click="$router.push({path:'/detail',query:{id:item.id}})" v-for="item in data" :key="item.id">
        <img v-lazy="item.cover_url" alt />
        <span>{{ item.title }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<style scoped lang='less'>
.cate {
  width: 100%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  margin-top: 20px;
  .van-grid {
    height: 100%;

    .van-grid-item {
      width: 25%;

      img {
        width: 100%;
      }
      span {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}
</style>