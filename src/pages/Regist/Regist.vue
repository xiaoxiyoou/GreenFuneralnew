<template>
  <div class="container">
    <div class="con col a-c">
      <div class="top row">
        <div class="tabDouble row j-c a-c" :class="idx==index?'hover':''" @click="son(item,idx)" v-for="(item,idx) in menu" :key="idx">{{item}}</div>
      </div>
      <div class="peopleMsg" v-if="person">
        <div class="item  row j-b a-c">
          <div class="text">联系电话</div>
          <input type="text" name="username" id="birth" v-model="username" placeholder="请输入手机号码作为账号" value="" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">登录密码</div>
          <input type="text" name="password" id="death" v-model="password" placeholder="请输入登录密码" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">真实姓名</div>
          <input type="text" name="truename" v-model="truename" placeholder="请输入姓名" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">服务宣言</div>
        </div>
        <div class="btmMsg">
          <textarea name="life" v-model="intro" placeholder="请输入您的自我介绍" @blur="getHeight"></textarea>
        </div>
        <div class="headImgCon   row j-b a-c van-hairline--bottom">
          <div class="text">形象照片</div>
          <img class="headImg" id="ImageUp" :src="headimgurl" alt="" @click="cropShow(true,1)" />
          <input id="PicturePath" name="Imgurl" type="hidden" value="" />
        </div>
      </div>
      <!-- 机构 -->
      <div class="peopleMsg" v-if="mechan">
        <div class="item  row j-b a-c">
          <div class="text">姓名</div>
          <input type="text" name="name" v-model="owner" placeholder="请输入完整姓名" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">公司名称</div>
          <input type="text" name="deathdate" id="death" v-model="companyname" placeholder="请输入公司名称" />
        </div>

        <div class="item  row j-b a-c" @click="CompanyShow(true)">
          <div class="text">公司类别</div>
          <input type="text" name="buryaddr" readonly="readonly" v-model="CompanyClassily" placeholder="选择公司类别" value="" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">公司地址</div>
          <input type="text" name="address" v-model="address" placeholder="请输入公司详细地址" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">手机号</div>
          <input type="text" name="coMobile" id="birth" v-model="coMobile" placeholder="请输入手机号" value="" />
        </div>

        <div class="item  row j-b a-c">
          <div class="text">系统版本</div>
          <div class="text">标准版会员260元/年</div>
        </div>
        <div class="item  row j-b a-c">
          <div class="text">支付费用</div>
          <div class="text">￥0.00 元/年</div>
        </div>

      </div>
      <van-popup v-model="pickerPeople" position="bottom">
        <van-picker show-toolbar title="请选择资质" :columns="catidName" @cancel="onCancel" @confirm="onConfirm" :loading="loading" />
      </van-popup>
      <van-popup v-model="pickerCompany" position="bottom">
        <van-picker show-toolbar title="请选择企业类型" :columns="cocatidName" @cancel="onCancel2" @confirm="onConfirm2" :loading="loadTwoing" />
      </van-popup>
      <van-popup v-model="datetime" position="bottom" :columns-placeholder="['请选择', '请选择', '请选择']" :style="{ height: '40%' }">
        <van-datetime-picker v-if="datetime" v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="confirm" @cancel="cancel" />
      </van-popup>
      <upImg :showCrop="showCrop" :fixedNumber="fixedNumber" @cropShow="cropShow" @photoUp="photoUp" />
      <div class="btmCon row j-c a-c" v-if="person && showBtn" @click="toPerson">
        <div class="btm row j-c a-c">确认提交</div>
      </div>
      <div class="btmCon row j-c a-c" v-if="mechan && showBtn" @click="toMechan">
        <div class="btm row j-c a-c">确认提交</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant'
import { emceeRegist, storeRegist, getquali, getcatelist } from 'api/index'
import upImg from 'components/upImg/upImg'
export default {
  data() {
    return {
      owner: "",
      loading: true,
      loadTwoing: true,
      fixedNumber: [1.01, 1],
      timeSelect: 1,
      menu: ['司仪申请', '企业申请'],
      index: 0,
      mechan: false,
      person: true,
      // 人员参数
      username: '',
      truename: '',
      headimgurl: require('./headUp.png'),
      password: '',
      mobile: '',
      telephone: '',
      Qualification: '',
      qcode: '',
      qgetdate: '',
      workyear: '',
      workstar: '',
      workmain: '',
      companyname: '',
      catid: 0,
      catidIndex: 0,
      catidCon: [],
      // headUp:require('./headUp.png'),
      catidName: [],


      // 机构参数
      coCompanyname: '',
      imgurl: require('./headUp.png'),
      banner: [],
      address: '',
      coMobile: '',
      coTelephone: '',
      email: '',
      establishdate: '',
      Legalperson: '',
      fzr: '',
      intro: '',
      contents: '',
      capital: '',
      personnel: '',
      coQualification: '',
      pickerPeople: false,
      minDate: new Date(1790, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      datetime: false,
      showCrop: false,
      CompanyClassily: '',
      CompanyIndex: "",
      cocatidName: [],
      cocatidCon: '',
      pickerCompany: false,
      cropstate: 1,
      // 防止被弹起
      showBtn: true,
      clientHeight: document.documentElement.clientHeight,








    }
  },
  mounted() {

    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._getquali()
    this._getcatelist()
    // 防止被弹起
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    }




  },
  methods: {
    // 图片
    delect(flag) {
      this.banner.splice(flag, 1)

    },
    // 选图
    photoUp(flag) {
      Toast.clear();
      if (this.cropstate == 1) {
        this.headimgurl = flag
      } else if (this.cropstate == 2) {
        this.banner = this.banner.concat(flag)
      } else {
        this.imgurl = flag
      }
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
    // 时间选择
    pickTime(flag) {
      this.timeSelect = flag
      this.datetime = true

    },
    confirm(value) {
      this.datetime = false
      console.log(value)
      if (this.timeSelect == 1) {
        this.qgetdate = value
      } else {
        this.establishdate = value
      }
    },
    cancel() {
      this.datetime = false

    },
    // 资质选择
    QualifiShow(flag) {
      this.pickerPeople = flag

    },
    onConfirm(value, index) {
      this.catidIndex = index
      this.Qualification = value
      this.pickerPeople = false
    },
    onCancel() {
      this.pickerPeople = false
    },
    // 企业类型选择
    CompanyShow(flag) {
      this.pickerCompany = flag

    },
    onConfirm2(value, index) {
      this.CompanyIndex = index
      this.CompanyClassily = value
      this.pickerCompany = false
    },
    onCancel2() {
      this.pickerCompany = false
    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    // 人员分类
    _getquali() {
      getquali().then(res => {
        console.log('人员分类', res)
        this.catidName = res.data.list.map(function (item) {
          return item.name;
        });
        this.catidCon = res.data.list.map(function (item) {
          return item.id;
        });
        // console.log(this.catidName)
        // console.log(this.catidCon)
        this.loading = false;

      })
    },
    // 机构分类
    _getcatelist() {
      getcatelist().then(res => {
        console.log('机构分类', res)
        this.cocatidName = res.data.list.map(function (item) {
          return item.name;
        });
        this.cocatidCon = res.data.list.map(function (item) {
          return item.id;
        });
        this.loadTwoing = false;

      })
    },
    // 人员注册
    _emceeapiAdd() {
      if (this.username == '') {
        Toast('请输入您的电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.username)) && !(/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(this.username))) {
        Toast('请输入正确电话号码')
        return false
      } else if (this.password == '') {
        Toast('请输入登录密码')
        return false
      } else if (this.truename == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.intro == '') {
        Toast('请输入您的自我介绍')
        return false
      } else if (this.headimgurl == require('./headUp.png') || this.headimgurl == "") {
        Toast('请上传您的照片')
        return false
      } else {
        emceeRegist({
          username: this.username,
          truename: this.truename,
          password: this.password,
          intro: this.intro,
          photo: this.headimgurl,

        }).then(res => {
          console.log('人员注册', res)
          Toast(res.msg)


        })

      }
    },
    // 机构注册
    _companyapiAdd() {
      let banner = this.banner.join("|")
      console.log(this.coMobile)
      if (this.owner == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.companyname == '') {
        Toast('请输入公司名称')
        return false
      } else if (this.CompanyClassily == '') {
        Toast('请选择公司类别')
        return false
      } else if (this.address == '') {
        Toast('请输入公司地址')
        return false
      } else if (this.coMobile == '') {
        Toast('请输入公司联系电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.coMobile)) && !(/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(this.coMobile))) {
        Toast('请输入正确电话号码')
        return false
      } else {
        storeRegist({
          owner: this.owner,
          companyname: this.companyname,
          category: this.cocatidCon[this.CompanyIndex],
          address: this.address,
          mobile: this.coMobile,

        }).then(res => {
          console.log('机构注册', res)
          Toast(res.msg)


        })

      }
    },
    // 切换
    son(item, idx) {
      this.index = idx;
      console.log(idx)
      if (idx) {
        this.mechan = true
        this.person = false
      } else {
        this.mechan = false
        this.person = true

      }

    },
    // 提交机构
    toMechan() {
      this._companyapiAdd()

    },
    // 提交人员
    toPerson() {
      this._emceeapiAdd()

    },

  },
  components: {
    upImg

  }
}
</script>
<style scoped >
.container {
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: #f5f5f5;
  height: 100%;
}
.con {
  padding-bottom: 126px;
}
.top {
  width: 400px;
  height: 61px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #5aa967;
  background-color: #ffffff;
  margin-top: 36px;
  color: #5aa967;
}

.tabDouble {
  font-size: 30px;
  width: 50%;
  height: 61px;
}
.hover {
  background-color: #5aa967;
  color: #ffffff;
}
.peopleMsg {
  padding: 0 29px;
  background-color: #ffffff;
  width: 690px;
  margin-top: 0.28rem;
  border-radius: 0.1rem;
}
.deoble {
  display: none;
}
.peopleMsg > .item {
  height: 97px;

  border-bottom: 1px solid #f5f5f5;
  color: #000000;
  font-size: 31px;
}
input {
  text-align: right;
}
.headImgCon {
  height: 160px;
  color: #000000;
  font-size: 31px;
  position: relative;
}

.headImg {
  width: 122px;
  height: 122px;
  position: absolute;
  right: 0;
}
.btmMsg {
  background-color: #ffffff;
  border-radius: 0.1rem;
  font-size: 31px;
  color: #000000;
}
.btmMsg > .item {
  height: 0.96rem;
}
.btmMsg > .item > .btn {
  width: 1.82rem;
  height: 0.55rem;
  background-color: #6a6198;
  color: #ffffff;
  font-size: 0.24rem;
  border-radius: 0.26rem;
  white-space: nowrap;
}
textarea {
  width: 100%;
  height: 150px;
  color: #000000;
  font-size: 31px;
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
}
.layui-upload-list {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.imglist {
  position: relative;
  display: inline-block;
  margin-top: 0.2rem;
}
.imglist img {
  width: 3rem;
  height: 4rem;
}

.btmCon {
  width: 100%;
  position: fixed;
  bottom: 18px;
}
form {
  text-align: right;
}
.btm {
  width: 690px;
  height: 90px;
  background-color: #5aa967;
  color: #ffffff;
  font-size: 32px;
  border-radius: 10px;
}
.bar {
  height: 280px;
  width: 750px;
  background-color: #f5f5f5;
}

.lifeImg {
  padding: 30px 0;
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