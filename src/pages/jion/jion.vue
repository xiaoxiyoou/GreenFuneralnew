<template>
  <div class="container">
    <div class="con col a-c">
      <div class="top row"  :style="{'color':color,'border-color': color}">
        <div class="tabDouble row j-c a-c" :class="idx==index?'hover':''" @click="son(item,idx)" v-for="(item,idx) in menu" :key="idx" :style="{'background-color':color}"></div>
      </div>
      <div class="topAb row">
        <div class="tabDouble1 row j-c a-c" :class="idx==index?'hover2':''" @click="son(item,idx)" v-for="(item,idx) in menu" :key="idx">{{item}}</div>
      </div>
      <div class="peopleMsg" v-if="person">
        <div class="item  row j-b a-c">
          <div class="text">姓名</div>
          <input type="text" name="name" v-model="name" placeholder="请输入姓名" />
        </div>
        <div class="headImgCon   row j-b a-c van-hairline--bottom">
          <div class="text">上传头像</div>
          <img class="headImg" id="ImageUp" :src="headimgurl" alt="" @click="cropShow(true,1)" />
          <input id="PicturePath" name="Imgurl" type="hidden" value="" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">联系电话</div>
          <input type="text" name="birthday" id="birth" v-model="mobile" placeholder="请输入电话号码" value="" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">身份证号码</div>
          <input type="number" name="deathdate" id="death" v-model="idecode" placeholder="请输入证件号码" />
        </div>
        <div class="item  row j-b a-c" @click="QualifiShow(true)">
          <div class="text">所获资质</div>
          <input type="text" name="age" placeholder="请选择资质" v-model="Qualification" readonly="readonly" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">资质证书编号</div>
          <input type="number" name="birthaddr" id="txt_area" v-model="qcode" placeholder="请输入编号" value="" />
        </div>
        <div class="item  row j-b a-c" @click="pickTime(1)">
          <div class="text">获得资质时间</div>
          <input type="text" name="buryaddr" :value="qgetdate | moment" placeholder="请选择时间" readonly="readonly" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">从业年限</div>
          <input type="number" name="buryaddr" v-model="workyear" placeholder="请输入年限" value="" />
        </div>
        <div class="btmMsg">
          <div class="item  row j-b a-c">
            <div class="text">主要工作内容</div>
          </div>
          <textarea name="life" v-model="workmain" placeholder="请输入工作内容" @blur="getHeight"></textarea>
        </div>
        <div class="item  row j-b a-c">
          <div class="text">所在企业</div>
          <input type="text" name="buryaddr" v-model="companyname" placeholder="请输入企业" value="" />
        </div>

      </div>
      <!-- 机构 -->
      <div class="peopleMsg" v-if="mechan">
        <div class="item  row j-b a-c">
          <div class="text">机构名称</div>
          <input type="text" name="name" v-model="coCompanyname" placeholder="请输入机构名称" />
        </div>
        <div class="headImgCon   row j-b a-c van-hairline--bottom">
          <div class="text">机构头像</div>
          <img class="headImg" id="ImageUp" :src="imgurl" alt="" @click="cropShow(true,3)" />
          <input id="PicturePath" name="Imgurl" type="hidden" value="" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">联系电话</div>
          <input type="text" name="birthday" id="birth" v-model="coMobile" placeholder="请输入电话号码" value="" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">机构地址</div>
          <input type="text" name="deathdate" id="death" v-model="address" placeholder="请输入地址" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">法人名称</div>
          <input type="text" name="age" v-model="Legalperson" placeholder="请输入名称" />
        </div>
        <div class="item  row j-b a-c" @click="pickTime(2)">
          <div class="text">成立时间</div>
          <input type="text" name="birthaddr" id="txt_area" readonly="readonly" :value="establishdate | moment" placeholder="请选择时间" />
        </div>
        <div class="item  row j-b a-c" @click="CompanyShow(true)">
          <div class="text">机构类型</div>
          <input type="text" name="buryaddr" readonly="readonly" v-model="CompanyClassily" placeholder="请选择机构类型" value="" />
        </div>
        <div class="item  row j-b a-c">
          <div class="text">职员人数</div>
          <input type="number" name="buryaddr" v-model="personnel" placeholder="请输入人数" value="" />
        </div>

        <div class="btmMsg">
          <div class="item  row j-b a-c">
            <div class="text">主要经营</div>
          </div>
          <textarea name="life" v-model="intro" placeholder="请输入经营项目" @blur="getHeight"></textarea>
        </div>
        <div class="headImgCon   row j-b a-c">
          <div class="text">上传机构图片</div>
          <img class="headImg" id="ImageUp" src="./headUp.png" alt="" @click="cropShow(true,2)" />
          <input id="PicturePath" name="Imgurl" type="hidden" value="" />
        </div>
        <div class="lifeImg row f-w j-b">
          <div class="item" v-for="(item,index) in banner" :key="index">
            <img class="delect" src="./delect.png" alt="" @click="delect(index)">
            <img class="" :src="item" alt="">
          </div>
        </div>
      </div>
      <!-- <div class="bar"></div> -->
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
        <div class="btm row j-c a-c" :style="{'background-color':color}">确认提交</div>
      </div>
      <div class="btmCon row j-c a-c" v-if="mechan && showBtn" @click="toMechan">
        <div class="btm row j-c a-c" :style="{'background-color':color}">确认提交</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant'
import { emceeapiAdd, companyapiAdd, getquali, getcatelist } from 'api/index'
import upImg from 'components/upImg/upImg'
export default {
  data() {
    return {
      color: localStorage.getItem("color"),
      loading: true,
      loadTwoing: true,
      fixedNumber: [1.01, 1],
      timeSelect: 1,
      menu: ['人员公示', '机构公示'],
      index: 0,
      mechan: false,
      person: true,
      // 人员参数
      name: '',
      headimgurl: require('./headUp.png'),
      idecode: '',
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
      CompanyIndex: 0,
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
      if (this.name == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.headimgurl == require('./headUp.png') || this.headimgurl == "") {
        Toast('请上传您的证件照片')
        return false
      } else if (this.mobile == '') {
        Toast('请输入您的电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.mobile)) && !(/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(this.mobile))) {
        Toast('请输入正确电话号码')
        return false
      } else if (this.idecode == '') {
        Toast('请输入您的身份证号码')
        return false
      } else if (this.idecode.length != 18) {
        Toast('请输入正确身份证号码')
        return false
      } else {
        emceeapiAdd({
          name: this.name,
          headimgurl: this.headimgurl,
          idecode: this.idecode,
          mobile: this.mobile,
          telephone: this.telephone,
          Qualification: this.Qualification,
          qcode: this.qcode,
          qgetdate: this.qgetdate,
          workyear: this.workyear,
          workstar: this.workstar,
          workmain: this.workmain,
          companyname: this.companyname,
          catid: this.catidCon[this.catidIndex]
        }).then(res => {
          console.log('人员注册', res)
          if (res.code == 0) {
            Toast('注册成功')
          } else {
            Toast(res.msg)
          }

        })

      }
    },
    // 机构注册
    _companyapiAdd() {
      let banner = this.banner.join("|")
      console.log(this.coMobile)
      if (this.coCompanyname == '') {
        Toast('请机构名称')
        return false
      } else if (this.imgurl == require('./headUp.png') || this.imgurl == "") {
        Toast('请上传机构头像')
        return false
      } else if (this.coMobile == '') {
        Toast('请输入机构联系电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.coMobile)) && !(/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,4}))?$/.test(this.coMobile))) {
        Toast('请输入正确电话号码')
        return false
      } else if (this.address == '') {
        Toast('请输入机构地址')
        return false
      } else if (this.banner == '') {
        Toast('请上传机构展示照片')
        return false
      } else {
        companyapiAdd({
          Companyname: this.coCompanyname,
          imgurl: this.imgurl,
          banner: banner,
          address: this.address,
          Mobile: this.coMobile,
          Telephone: this.coTelephone,
          email: this.email,
          establishdate: this.establishdate,
          Legalperson: this.Legalperson,
          fzr: this.fzr,
          intro: this.intro,
          contents: this.contents,
          capital: this.capital,
          personnel: this.personnel,
          Qualification: this.coQualification,
          cateid: this.cocatidCon[this.CompanyIndex]
        }).then(res => {
          console.log('机构注册', res)
          if (res.code == 0) {
            Toast('注册成功')
          } else {
            Toast(res.msg)
          }

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
  height: 100%;
}
.con {
  background-color: #f5f5f5;
  padding-bottom: 126px;
}
.top {
  width: 400px;
  height: 61px;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid #52aa5e;
  background-color: #ffffff;
  margin-top: 36px;
  color: #52aa5e;
}

.tabDouble {
  font-size: 30px;
  width: 50%;
  height: 100%;
  opacity: 0;
}
.hover {
  background-color: #52aa5e;
  color: #ffffff;
  height: 100%;
  opacity: 1;
}
.topAb {
  width: 400px;
  height: 61px;
  overflow: hidden;
  border-radius: 10px;
  top: 36px;
  position: absolute;
  z-index: 3;
}
.topAb > .tabDouble1 {
  font-size: 30px;
  width: 50%;
  height: 61px;
  color: #333;
}
.topAb > .hover2 {
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
  height: 220px;
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
  padding: 0;
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