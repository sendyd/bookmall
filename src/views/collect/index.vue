<script setup>
import { ref ,reactive, onBeforeMount, onMounted , computed ,defineProps,watch} from 'vue'
import { useStore } from 'vuex'
import { getCollect } from '../../api/collect'
const store = useStore()
import { useRouter ,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(() => {
init()
})
const init = () => {
  getCollect().then(res=>{
    state.collect = res.data
  })
}
const state = reactive({
  collect:[]
})
</script>
<template>
  <div>
    <van-card
    v-for="item in state.collect"
  :price="item.goods.price"
  :desc="item.goods.description"
  :title="item.goods.title"
  :thumb="item.goods.cover_url"
/>
  </div>
</template>
<style scoped lang='less'>
:deep(.van-card__price){
  color:var(--color-tint)
}
</style>