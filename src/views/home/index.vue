<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { getHomeData } from "@/api/home";
import homeSwipeVue from "./components/home-swipe.vue";
import homeCateVue from "./components/home-cate.vue";
import homeGoodsVue from "./components/home-goods.vue";
import appFooterVue from "../../components/app-footer.vue";
const state = reactive({
  banners: [],
  category: []
})
const init = () => {
  getHomeData().then((res) => {
  // console.log(res);
  state.banners = res.slides
  state.category = res.goods.data.splice(0, 4)
});
}
onMounted(()=>{
  init()
})
</script>
<template>
  <div v-if="state.banners">
    <homeSwipeVue :data="state.banners"/>
    <homeCateVue :data="state.category"/>
    <homeGoodsVue />
    <appFooterVue />
  </div>
</template>
<style scoped lang='less'>
</style>