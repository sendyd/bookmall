<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { areaList } from '@vant/area-data';
import { getAddress } from '../../api/address';
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant';
const router = useRouter()
const init = () => {
  getAddress().then(res => {
    // console.log(res);
    state.address = res.data
    const obj = {
      id: '',
      name: '',
      tel: '',
      address: '',
      isDefault: false
    }
    // res.data.forEach(item => {
    //   obj.id = item.id
    //   obj.name = item.name
    //   obj.tel = item.phone
    //   obj.address = item.province === item.city ? item.city + item.county + item.address : item.province + item.city + item.county + item.address
    //   obj.isDefault = item.is_default === 1 ? true : false
    //   state.list.push(obj)
    // console.log(state.list);
    // })
    res.data.map(( item, index,arr,) => {
      item.id = arr[index].id
      item.name = arr[index].name
      item.tel = arr[index].phone
      item.address = arr[index].province === arr[index].city ? arr[index].city + arr[index].county + arr[index].address : arr[index].province + arr[index].city + arr[index].county + arr[index].address
      item.isDefault = arr[index].is_default === 1 ? true : false
      state.list.push(item)
    })
  })

}
onMounted(() => {
  init()
})
const state = reactive({
  list: [],
  address: [{ id: '' }],
  disabledList: [
    {
      id: '3',
      name: '王五',
      tel: '1320000000',
      address: '浙江省杭州市滨江区江南大道 15 号',
    },
  ],

})
const onAdd = () => {
  router.push('/address/add')
}
const onEdit = (item, index) => {
  router.push({ path: '/address/edit', query: { id: item.id, index: index } })
}

const defalutAddressId = computed(()=>{
  return state.list.find(item => item.isDefault === true)?.id
})
</script>
<template>
  <div>
    <van-address-list
    v-model="defalutAddressId"
      :list="state.list"
      :disabled-list="state.disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>
<style scoped lang='less'>
</style>