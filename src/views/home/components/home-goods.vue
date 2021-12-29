<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps } from 'vue'
import { getHomeData } from '../../../api/home';
const state = reactive({
  paramsList: [
    {
      recommend: 1,
      page: 1
    },
    {
      recommend: 1,
      page: 1
    },
    {
      new: 1,
      page: 1
    },
  ],
  active: 0,
  titles: ['热销', '推荐', '最新 '],
  goodList: []
})

onMounted(() => {
  init()
})

const init = () => {
  getHomeData(state.paramsList[state.active]).then(res => {
    // console.log(res);
    state.goodList = res.goods.data
  })
}
const handleTab = (val) => {
  state.active = val.name
  state.goodList = []
  state.paramsList[state.active].page = 1
  finished.value = false
  init()
}

const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // console.log('触底');
  state.paramsList[state.active].page ++
   getHomeData(state.paramsList[state.active]).then(res => {
    state.goodList.push(...res.goods.data)
    // console.log(state.goodList);
    loading.value = false
    if(res.goods.data.length === 0) {
      finished.value = true
    }
  })
  
}
</script>
<template>
  <div class="good">
    <van-tabs sticky offset-top="46" v-model="state.active" @click-tab="handleTab">
      <van-tab v-for="(item ,index) in state.titles" :key="index" :title="item">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-grid  :column-num="2">
            <van-grid-item @click="$router.push({path:'/detail',query:{id:item.id}})" v-for="item in state.goodList " :key="item.id">
              <img v-lazy="item.cover_url" alt />
              <span>{{ item.title }}</span>
            </van-grid-item>
          </van-grid>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<style scoped lang='less'>
.good {
  width: 100%;
  margin-top: 20px;
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
}
</style>