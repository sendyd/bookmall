<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps } from 'vue'
import appFooterVue from '../../components/app-footer.vue';
import { getCategory } from '../../api/category';
const value1 = ref('a');
const value2 = ref(0);
const active = ref(0)
const activeNames = ref(['0'])
const option1 = [
  { text: '全部商品', value: 'a' }
];
const option2 = [
  { text: '默认排序', value: 0 },
  { text: '销量排序', value: 1 },
  { text: '推荐排序', value: 2 },
  { text: '价格排序', value: 3 },
];
const state = reactive({
  list: [
    {
      sales: 1,
      page: 1
    },
    {
      recommend: 1,
      page: 1
    },
    {
      price: 1,
      page: 1
    }
  ],
  category_id: 0,
  menus: [],
  goodlist: []
})
const handleMenu = (val) => {
  value2.value = val
  init()
}
onMounted(() => {
  init()
})

const init = () => {
  const params = {
    category_id: state.category_id,
    ...state.list[value2.value]
  }
  getCategory(params).then(res => {
    // console.log(res);
    state.menus = res.categories
    state.goodlist = res.goods.data
  })
}
const handleTab = (id) => {
  state.category_id = id
  init()
}
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // console.log('触底');
  state.list[value2.value].page ++
  //  getHomeData(state.paramsList[state.active]).then(res => {
  //   state.goodList.push(...res.goods.data)
  //   // console.log(state.goodList);
  //   loading.value = false
  //   if(res.goods.data.length === 0) {
  //     finished.value = true
  //   }
  // })
  const params = {
    category_id: state.category_id,
    ...state.list[value2.value]
  }
  getCategory(params).then(res => {
    state.goodlist.push(...res.goods.data)
      loading.value = false
    if(res.goods.data.length === 0) {
      finished.value = true
    }
  })
  
}
</script>
<template>
  <div class="category">
    <div class="mian">
      <div class="cate">
        <van-sticky :offset-top="96">
        <van-sidebar v-model="active">
          <van-collapse v-model="activeNames">
            <van-collapse-item
              v-for="(item,index) in state.menus "
              :key="item.id"
              :title="item.name"
              :name="index"
            >
              <van-sidebar-item
                v-for="item1 in item.children"
                :key="item1.id"
                :title="item1.name"
                @click="handleTab(item1.id)"
              />
            </van-collapse-item>
          </van-collapse>
        </van-sidebar>
        </van-sticky>
      </div>
      <div class="right">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item @change="handleMenu" v-model="value2" :options="option2" />
        </van-dropdown-menu>
       <div class="list">
          <van-list
          v-model:loading="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-card
            v-for="item in state.goodlist"
            :key="item.id"
            num="1"
            tag="还行"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            :origin-price="99.00"
          />
        </van-list>
       </div>
      </div>
    </div>

    <appFooterVue />
  </div>
</template>
<style scoped lang='less'>

.mian {
  //  position: fixed;
  display: flex;
  margin-bottom: 50px;
  // position: fixed;
  .cate {
    
    // overflow: hidden;
    margin-top: 48px;
    height: 200px;
    z-index: inherit;
    .van-sidebar {
      width: 140px;
      // position: sticky;
      // top: 48px;
      
    }
  }
  .right {
    // width: 100%;
    flex: 1;
    overflow: hidden;
    .van-dropdown-menu {
      width: 100%;
      .van-dropdown-item {
        width: 100%;
      }
    }
  }
}
.category {
  margin-top: 46px;
  overflow: hidden;
  .list{
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow: scroll;
    :deep(.van-card__price){
  color: var(--color-high-text);
}
  }
}
</style>