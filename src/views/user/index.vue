<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { getUserInfo } from '../../api/user'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
import appFooterVue from '../../components/app-footer.vue'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getUserInfo().then(res => {
    // console.log(res);
    state.info = res
  })
}
const state = reactive({
  info: {}
})
</script>
<template>
  <div class="user">
    <div class="userinfo">
      <div class="img">
        <img v-lazy="state.info.avatar_url" alt />
      </div>
      <div class="right">
        <dl>
          <dt>用户昵称：</dt>
          <dd>{{ state.info.name }}</dd>
        </dl>
        <dl>
          <dt>用户昵称：</dt>
          <dd>{{ state.info.email }}</dd>
        </dl>
      </div>
    </div>
    <div class="main">
      <van-cell title="账号管理" is-link to="/user/edit" />
      <van-cell title="订单管理" is-link to="/order/list" />
      <van-cell title="地址管理" is-link to="/address/list" />
      <van-cell title="我的收藏" is-link to="/collect/list" />
      <van-cell title="关于我们" is-link to="/order/list" />
    </div>
    <appFooterVue />
  </div>
</template>
<style scoped lang='less'>
.main {
  margin-top: 50px;
  .van-cell {
    border-bottom: 1px solid #ccc;
  }
}
.user {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  padding: 20px;
  .userinfo {
    width: 100%;
    background-color: #ccc;
    height: 100px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    .img {
      width: 100px;
      text-align: center;

      img {
        width: 50px;
        height: 50px;
      }
    }
    .right {
      dl {
        display: flex;
        line-height: 1.4;
        dd {
          font-size: 14px;
          color: aqua;
        }
        dt {
          font-size: 14px;
          color: #000;
        }
      }
    }
  }
}
</style>