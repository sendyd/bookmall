<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { areaList } from '@vant/area-data';
import { addAddress } from '@/api/address';
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant';
const router = useRouter()


const onSave = (val) => {
  // console.log(val);
  const params = {
    name: val.name,
    address: val.addressDetail,
    phone: val.tel,
    province:val.province,
    city: val.city,
    county: val.county,
    is_default: val.isDefault ? 1 : 0,
  }
  addAddress(params).then(res=>{
   
    if(res.status === 201 || res.status === 204) {
      Toast.success('添加地址成功')
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
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>
<style scoped lang='less'>
</style>