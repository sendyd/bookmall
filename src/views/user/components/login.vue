<script setup>
import { Toast } from 'vant';
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { goLogin } from '../../../api/user';
const router = useRouter()
const store = useStore()
const state = reactive({
  email: '1771641490@qq.com',
  password: 'ljj1314520'
})
const onSubmit = () => {
  goLogin(state).then(res => {
    // console.log(res);
    Toast.success('登录成功')
    router.go(-1)
    const token = res.access_token
    window.sessionStorage.setItem('token', token)
    store.dispatch('updateLogin' , true)
  })
}
</script>
<template>
  <div class="login">
    <div class="form">
      <div class="logo">
        <img src="../../../assets/img/xiugou.jpg" alt />
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="state.email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
          />
          <van-field
            v-model="state.password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div class="route">
          <span @click="$router.push('/register')">未注册账号，前往注册</span>
        </div>
        <div style="margin: 16px;">
          <van-button
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            round
            block
            type="primary"
            native-type="submit"
          >登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<style scoped lang='less'>
.route {
  width: 100%;
  padding: 0 20px;
  span {
    font-size: 14px;
    color: aquamarine;
  }
}
.logo {
  width: 100%;
  text-align: center;
  img {
    width: 100px;
  }
  margin-bottom: 20px;
}
.form {
  margin-top: 20px;
}
.login {
  background-color: #666666;
  background-image: url("https://cdn.pixabay.com/photo/2013/03/19/23/07/easter-bunny-95096_960_720.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 46px;
  left: 0;
}
</style>