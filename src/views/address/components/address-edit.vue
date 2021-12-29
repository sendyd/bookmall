<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { areaList } from '@vant/area-data';
import { getAddressInfo , editAddressInfo} from '../../../api/address';
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant';
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getAddressInfo(route.query.id).then(res => {
    console.log(res);
    state.addressInfo.name = res.name
    state.addressInfo.tel = res.phone
    state.addressInfo.province = res.province
    state.addressInfo.city = res.city
    state.addressInfo.county = res.county
    state.addressInfo.addressDetail = res.address
    state.addressInfo.isDefault = res.is_default === 1 ? true : false
  })
}


const onDelete = () => Toast('delete');
const state = reactive({
  addressInfo: {
    name: '',
    tel: '',
    province: '',
    city: '',
    county: '',
    addressDetail: '',
    areaCode: '431121',
    postalCode: '425000',
    isDefault: false
  }
})
const onSave = (val) => {
  console.log(val);
  const params = {
    name:val.name,
    address:val.addressDetail ,
    phone:val.tel,
    province:val.province,
    city:val.city,
    county:val.county,
    is_default:val.isDefault? 1:0,
  }
  editAddressInfo(route.query.id , params).then(res=>{
    console.log(res);
    if(res.status === 204) {
      Toast.success('编辑地址成功')
      router.go(-1)
    }
  })
}
</script>
<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :address-info="state.addressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<style scoped lang='less'>
</style>