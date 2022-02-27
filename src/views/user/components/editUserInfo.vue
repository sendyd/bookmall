<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { getUserInfo, setUserInfo , setAvatar} from '../../../api/user'

const store = useStore()
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getUserInfo().then(res => {
    state.info = res
  })
}
const state = reactive({
  nameShow: false,
  nickname: '',
  info: {},
  avatarShow: false,
  avatar:''
})
const handleConfirm = () => {
  setUserInfo({ name: state.nickname }).then(res => {
    // console.log(res);
    if (res.status === 204) return Toast.success('修改用户名成功')
  })
}
const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
  state.avatar = file.content
};
const handleAvatar = () => {
 Toast.success('点击上传头像')
}
</script>
<template>
  <div>
    <van-dialog
      v-model:show="state.avatarShow"
      title="修改用户头像"
      @confirm="handleAvatar"
      show-cancel-button
    >
      <van-form>
        <van-field name="uploader" label="用户头像上传">
          <template #input>
            <van-uploader :after-read="afterRead" :upload-icon="state.info.avatar_url" />
          </template>
        </van-field>
      </van-form>
    </van-dialog>
    <van-dialog
      v-model:show="state.nameShow"
      title="修改用户昵称"
      @confirm="handleConfirm"
      show-cancel-button
    >
      <van-form>
        <van-field
          v-model="state.nickname"
          name="用户昵称"
          label="用户昵称"
          :placeholder="state.info.name"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </van-form>
    </van-dialog>
    <van-button
      type="primary"
      @click="state.nameShow = true"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      block
    >点击修改用户昵称</van-button>
    <van-button
      type="primary"
      @click="state.avatarShow = true"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      block
    >点击修改用户头像</van-button>
  </div>
</template>
<style scoped lang='less'>
.van-field {
  padding: 20px;
}
</style>