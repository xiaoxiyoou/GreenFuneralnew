<template>
  <div class="container">
    <van-cell title="机构头像" center size="large">
      <template #right-icon>
        <img class="avate" :src="info.imgurl" alt="" @click="cropShow(true,1)">
      </template>
    </van-cell>
    <van-field v-model="info.companyname" label="机构名称" placeholder="请输入机构名称" size="large" input-align="right" right-icon="arrow" />
    <van-field v-model="info.mobile" label="联系电话" type="number" size="large" placeholder="请输入电话号码" input-align="right" right-icon="arrow" />
    <van-field v-model="info.address" label="机构地址" size="large" placeholder="请输入机构地址" input-align="right" right-icon="arrow" />
    <van-cell title="法人名称" :value="info.legalperson" size="large" />
    <van-cell title="机构类型" :value="info.catename" size="large" />
    <van-cell title="成立时间" :value="info.establishdate | moment" size="large" />
    <van-field v-model="info.personnel" label="职员人数" size="large" placeholder="请输入职员人数" input-align="right" right-icon="arrow" />
    <van-field v-model="info.intro" label="主要经营" size="large" placeholder="请输入主要经营内容" input-align="right" right-icon="arrow" />
    <van-cell title="修改机构照片" center size="large">
      <template #right-icon>
        <img class="avate" src="./headUp.png" alt="" @click="cropShow(true,2)">
      </template>
    </van-cell>
    <div class="lifeImg row f-w j-b">
      <div class="item" v-for="(item,index) in banner" :key="index">
        <img class="delect" src="./delect.png" alt="" @click="delect(index)">
        <img class="" :src="item" alt="">
      </div>
    </div>
    <div class="tip" :style="{'color':color}">*修改后暂不显示在列表中，待审核通过后恢复显示。</div>
    <div class="btn row j-c a-c" @click="confirm()" :style="{'background-color':color}">确认修改</div>
    <van-popup v-model="popShow" class="pop col a-c">
      <div class="title row j-c a-c" :style="{'background-color':color}">温馨提示</div>
      <div class="des">修改后暂不显示在列表中</div>
      <div class="des">待审核通过后恢复显示</div>
      <div class="poptip">*审核时间1~3个工作日</div>
      <div class="btm row van-hairline--top">
        <div class="cancel row j-c a-c" @click="cancel()" :style="{'color':color}">取消</div>
        <div class="confirm row j-c a-c" @click="confirmbtm()" :style="{'background-color':color}">确定修改</div>
      </div>
    </van-popup>
    <upImg :showCrop="showCrop" @cropShow="cropShow" @photoUp="photoUp" :fixedNumber="fixedNumber" />
  </div>

</template>
<script type="text/ecmascript-6">
import { company, savecompany } from 'api/index'
import upImg from 'components/upImg/upImg'
import { Toast } from 'vant'
export default {
  data() {
    return {
      color:localStorage.getItem("color"), 
      fixedNumber: [1.01, 1],
      popShow: false,
      info: '',
      showCrop: false,
      banner: []
      // value: '抚顺殡仪馆',
      // phone: 18302468380,
      // cardId: "辽宁省抚顺市",
      // work: 1,
      // company: '礼仪、服务',


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._company()


  },
  methods: {
    _savecompany() {
      let banner = this.banner.join("|")

      savecompany({
        Companyname: this.info.companyname,
        imgurl: this.info.imgurl,
        banner: banner,
        address: this.info.address,
        Mobile: this.info.mobile,
        Telephone: this.info.telephone,
        email: this.info.email,
        establishdate: this.info.establishdate,
        Legalperson: this.info.Legalperson,
        fzr: this.info.fzr,
        intro: this.info.intro,
        contents: this.info.contents,
        capital: this.info.capital,
        personnel: this.info.personnel,
        Qualification: this.info.Qualification,
        cateid: 2,
        id: this.info.id
      }).then(res => {
        console.log('机构注册', res)
        if (res.code == 0) {
          Toast('编辑成功')
        } else {
          Toast(res.msg)
        }

      })


    },
    confirm() {
      if (this.info.companyname == '') {
        Toast('请机构名称')
        return false
      } else if (this.info.imgurl == '') {
        Toast('请上传机构头像')
        return false
      } else if (this.info.mobile == '') {
        Toast('请输入机构联系电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.info.mobile)) && !(/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(this.info.mobile))) {
        Toast('请输入正确电话号码')
        return false
      } else if (this.info.address == '') {
        Toast('请输入机构地址')
        return false
      } else if (this.banner == '') {
        Toast('请上传机构展示照片')
        return false
      } else {
        this.popShow = true
      }
    },
    confirmbtm() {
      this.popShow = false
      this._savecompany()
    },
    // 图片
    delect(flag) {
      this.banner.splice(flag, 1)

    },
    cancel() {
      this.popShow = false
    },
    _company() {
      company().then(res => {
        console.log('信息', res)
        this.info = res.data.info
        this.banner = this.info.banner.split('|')

      })
    },
    // 上传图片
    cropShow(flag, cropstate) {
      console.log(cropstate)
      if (cropstate) {
        this.cropstate = cropstate
      }
      if (this.cropstate == 2) {
        this.fixedNumber = [1.79, 1]
      }
      this.showCrop = flag


    },
    // 选图
    photoUp(flag) {
      Toast.clear();
      if (this.cropstate == 1) {
        this.info.imgurl = flag
      } else if (this.cropstate == 2) {
        this.banner = this.banner.concat(flag)
      }
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
</style>
<style scoped >
.lifeImg {
  padding: 30px;
}
.lifeImg > .item {
  width: 48%;
  position: relative;
  margin-bottom: 25px;
}
.lifeImg > .item > .delect {
  position: absolute;
  right: -20px;
  top: -20px;
  width: 40px;
  height: 40px;
  display: block;
}
.lifeImg > .item > img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
}
</style>