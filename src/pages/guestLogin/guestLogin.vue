<template>
  <div class="container col a-c">
    <img class="banner" src="./banner.png" alt="" />
    <div class="put">
      <div class="item row a-c">
        <div class="text">账号：</div>
        <input placeholder="请输入账号" v-model="username" />
      </div>
      <div class="item row a-c">
        <div class="text">密码：</div>
        <input placeholder="请输入密码" v-model="password" />
      </div>
      <!-- <div class="receive row a-c">
        <img class="" src="./../../assets/img/select.png" />
        <div class="text">绑定此微信</div>
      </div> -->
    </div>
    <div class="btn row j-c a-c" @click="_LoginAdmin" :style="{'background-color':color}">登录</div>
    <div class="tip row j-c a-c" @click="jion" :style="{'color':color}">还没有登录账号，点击这里去申请>>></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { LoginAdmin } from 'api/index'
import { Toast } from 'vant';
export default {
  data() {
    return {
       color:localStorage.getItem("color"), 
      username: '',
      password: ''


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {
    _LoginAdmin() {
      if (!this.username) {
        Toast('请输入账号');
        return false
      } else if (!this.password) {
        Toast('请输入密码');
        return false
      } else {
        LoginAdmin({
          username: this.username,
          password: this.password
        }).then(res => {
          console.log('登陆', res)
          if (res.code == 1) {
            window.location.href = "http://b.fuyulove.com/5g/windex.aspx?u=" + res.data.u + "&p=" + res.data.p + "&sid=" + res.data.sid
          } else {
            Toast(res.msg);
          }

        })
      }

    },
    jion(){
      this.$router.push({
        path:'./Regist'
      })
    }

  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #ffffff
  .banner
    width 356px
    height auto
    margin-top 150px
  .put
    font-size 28px
    margin-top 30px
    .item
      margin-top 40px
    .receive
      margin-top 46px
      img
        width 30px
        height 30px
        margin-right 5px
  .btn
    background-color #5aa967
    width 690px
    height 90px
    border-radius 10px
    color #ffffff
    margin-top 65px
  .tip
    color #5aa967
    margin-top 35px
    font-size 30px
</style>
