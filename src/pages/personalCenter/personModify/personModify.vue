<template>
  <div class="container">
    <van-cell title="头像" center size="large">
      <template #right-icon>
        <img class="avate" :src="info.headimgurl" alt="" @click=" cropShow(true)">
      </template>
    </van-cell>
    <van-field v-model="info.name" label="姓名" placeholder="请输入姓名" size="large" input-align="right" right-icon="arrow" />
    <van-field v-model="info.mobile" label="联系电话" type="number" size="large" placeholder="请输入电话号码" input-align="right" right-icon="arrow" />
    <van-field v-model="info.idecode" label="身份证号码" type="number" size="large" placeholder="请输入身份证号码" input-align="right" right-icon="arrow" />
    <van-cell title="所获资质" :value="info.qualification" size="large" />
    <!-- <van-cell title="出生地" value="辽宁沈阳" size="large" /> -->
    <van-cell title="资质证书编号" :value="info.qcode" size="large" />
    <van-cell title="获得资质时间" :value="info.qgetdate | moment" size="large" />
    <van-cell title="从业年限" :value="info.workyear" size="large" />
    <van-field v-model="info.workmain" label="主要工作内容" size="large" placeholder="请输入主要工作内容" input-align="right" right-icon="arrow" />
    <van-field v-model="info.companyname" label="所在企业" size="large" placeholder="请输入所在企业" input-align="right" right-icon="arrow" />
    <div class="tip" 
:style="{'color':color}">*修改后暂不显示在列表中，待审核通过后恢复显示。</div>
    <div class="btn row j-c a-c" @click="confirm()" 
:style="{'background-color':color}">确认修改</div>
    <van-popup v-model="popShow" class="pop col a-c">
      <div class="title row j-c a-c" :style="{'background-color':color}">温馨提示</div>
      <div class="des">修改后暂不显示在列表中</div>
      <div class="des">待审核通过后恢复显示</div>
      <div class="poptip">*审核时间1~3个工作日</div>
      <div class="btm row van-hairline--top">
        <div class="cancel row j-c a-c" @click="cancel()" :style="{'color':color}">取消</div>
        <div class="confirm row j-c a-c" @click="confirmBtn()" 
:style="{'background-color':color}">确定修改</div>
      </div>
    </van-popup>
    <upImg :showCrop="showCrop" @cropShow="cropShow" @photoUp="photoUp" />

  </div>

</template>
<script type="text/ecmascript-6">
import upImg from 'components/upImg/upImg'
import { Toast } from 'vant'
import { emcee, saveemcee } from 'api/index'
export default {
  data() {
    return {
      color:localStorage.getItem("color"), 
      info: '',
      showCrop: false,
      popShow: false,
      // value: '李雷',
      // phone: 18302468380,
      // cardId: 211324185415212,
      // work: '礼仪、服务',
      // company: '抚顺县毛燕殡仪馆',
      // headimgurl: require('./avater.png')


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    this._emcee()
  },
  methods: {
    cropShow(flag) {
      this.showCrop = flag
    },

    // 选图
    photoUp(flag) {
      Toast.clear();
      this.info.headimgurl = flag
    },
    cancel() {
      this.popShow = false
    },
    confirm() {
      if (this.info.name == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.info.headimgurl == "") {
        Toast('请上传您的证件照片')
        return false
      } else if (this.info.mobile == '') {
        Toast('请输入您的电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.info.mobile)) && !(/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(this.info.mobile))) {
        Toast('请输入正确电话号码')
        return false
      } else if (this.info.idecode == '') {
        Toast('请输入您的身份证号码')
        return false
      } else if (this.info.idecode.length != 18) {
        Toast('请输入正确身份证号码')
        return false
      } else {
        this.popShow = true
      }
    },
    confirmBtn() {
      this._saveemcee()
      this.popShow = false

    },
    _emcee() {
      emcee().then(res => {
        console.log('信息', res)
        this.info = res.data.info

      })
    },
    // 人员注册
    _saveemcee() {

      saveemcee({
        name: this.info.name,
        headimgurl: this.info.headimgurl,
        idecode: this.info.idecode,
        mobile: this.info.mobile,
        telephone: this.info.telephone,
        Qualification: this.info.Qualification,
        qcode: this.info.qcode,
        qgetdate: this.info.qgetdate,
        workyear: this.info.workyear,
        workstar: this.info.workstar,
        workmain: this.info.workmain,
        companyname: this.info.companyname,
        id: this.info.id
      }).then(res => {
        console.log('人员注册', res)
        if (res.code == 0) {
          Toast('编辑成功')
        } else {
          Toast(res.msg)
        }

      })


    },

  },
  components: {
    upImg

  }
}
</script>
<style scoped lang="stylus">
>>>.van-field__label
  width 100px !important
>>>.van-cell__value
  color #323233
  font-size 16px !important
>>>.van-field__control
  font-size 16px !important
  color #c5c5c5 !important
>>>.avate
  width 155px
  height 155px
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .pop
    width 648px
    border-radius 20px
    .title
      background-color #5aa967
      color #ffffff
      width 100%
      height 80px
      margin-bottom 90px
      font-size 38px
    .poptip
      color #878787
      font-size 30px
      margin 64px auto 51px
    .des
      color #292929
      font-size 32px
    .btm
      width 100%
      height 90px
      font-size 36px
      .cancel
        color #5aa967
        width 200px
      .confirm
        width 450px
        background-color #5aa967
        color #ffffff
  .tip
    color #5aa967
    font-size 27px
    margin-top 33px
    text-align center
    display block
  .btn
    width 690px
    height 90px
    background-color #5aa967
    border-radius 10px
    color #ffffff
    margin 10px auto 20px
    font-size 35px
</style>