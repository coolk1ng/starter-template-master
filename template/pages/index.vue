<template>
  <div class="home page-component">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 2" :key="item">
        <img src="~assets/images/web-banner1.png" alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索 -->
    <div class="search-container">
      <div class="search-wrapper">
        <div class="hospital-search">
          <el-autocomplete
            class="search-input"
            prefix-icon="el-icon-search"
            v-model="hospital.hosname"
            :fetch-suggestions="querySearchAsync"
            placeholder="点击输入医院名称"
            @select="handleSelect">
            <span slot="suffix" class="search-btn v-link highlight clickable selected">搜索 </span>
          </el-autocomplete>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class="bottom">
      <div class="left">
        <div class="home-filter-wrapper">
          <div class="title"> 医院</div>
          <div>
            <div class="filter-wrapper">
              <span class="label">等级：</span>
              <div class="condition-wrapper">
                <span v-for="(item,index) in hostypeList" :key="index" @click="hostypeSelect(item.value,index)"
                      class="item v-link highlight clickable selected">
                  {{ item.name }}
                </span>
              </div>
            </div>
            <div class="filter-wrapper">
              <span class="label">地区：</span>
              <div class="condition-wrapper">
                <span v-for="(item,index) in districtList" :key="index" @click="districtSelect(item.value,index)"
                      class="item v-link highlight clickable selected">
                {{ item.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="v-scroll-list hospital-list">
          <div v-for="(item,index) in list" :key="index" @click="show(item.hoscode)"
               class="v-card clickable list-item">
            <div class="">
              <div
                class="hospital-list-item hos-item" index="0">
                <div class="wrapper">
                  <div class="hospital-title">
                    {{ item.hosname }}
                  </div>
                  <div class="bottom-container">
                    <div
                      class="icon-wrapper"><span
                      class="iconfont"></span>
                      {{ item.param.hostype }}
                    </div>
                    <div
                      class="icon-wrapper"><span
                      class="iconfont"></span>
                      {{ item.bookingRule.releaseTime }}
                    </div>
                  </div>
                </div>
                <img :src="'data:image/jpeg;base64,'+item.logoData" alt="北京协和医院" class="hospital-img"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="common-dept">
          <div class="header-wrapper">
            <div class="title"> 常见科室</div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <span class="item v-link clickable dark">神经内科 </span>
            <span class="item v-link clickable dark">消化内科 </span>
            <span class="item v-link clickable dark">呼吸内科 </span>
            <span class="item v-link clickable dark">内科 </span>
            <span class="item v-link clickable dark">神经外科 </span>
            <span class="item v-link clickable dark">妇科 </span>
            <span class="item v-link clickable dark"> 产科 </span>
            <span class="item v-link clickable dark">儿科 </span>
          </div>
        </div>
        <div class="space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper"><span
                class="iconfont title-icon"></span>
              </div>
              <span class="title">平台公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">关于延长北京大学国际医院放假的通知 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">北京中医药大学东方医院部分科室医生门诊医 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"> 武警总医院号源暂停更新通知 </span>
            </div>
          </div>
        </div>
        <div class="suspend-notice-list space">
          <div class="header-wrapper">
            <div class="title-wrapper">
              <div class="icon-wrapper">
                <span class="iconfont title-icon"></span>
              </div>
              <span class="title">停诊公告</span>
            </div>
            <div class="all-wrapper">
              <span>全部</span>
              <span class="iconfont icon"></span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"> 中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark"> 首都医科大学附属北京潞河医院老年医学科门诊停诊公告 </span>
            </div>
            <div class="notice-wrapper">
              <div class="point"></div>
              <span class="notice v-link clickable dark">中日友好医院中西医结合心内科门诊停诊公告 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hosp from '../api/hosp'
import dict from '../api/dict'

export default {
  // 服务端调用
  async asyncData({param, error}) {
    return hosp.getHospitalList({'pageNum': 1, 'pageSize': 10}).then(res => {
      return {
        list: res.data.content
      }
    }).catch(error => {
      console.log(error)
    })
  },
  data() {
    return {
      hospital: {
        pageNum: 1,
        pageSize: 10,
        hosname: '',
        hostype: '',
        districtCode: ''
      },
      hostypeList: [], //医院等级集合
      districtList: [], // 地区集合
      hostypeActiveIndex: 0,
      provinceActiveIndex: 0,
      state: '',
      hosname: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 查询医院的等级列表
      dict.getByDictCode('Hostype').then(res => {
        // 添加'全部' 这个值
        this.hostypeList = []
        this.hostypeList.push({"name": "全部", "value": ""})
        res.data.forEach(item => {
          this.hostypeList.push(item)
        })
      }).catch(error => {
        console.log(error)
      })
      // 查询地区数据
      dict.getByDictCode('Beijin').then(res => {
        this.districtList = []
        this.districtList.push({"name": "全部", "value": ""})
        res.data.forEach(item => {
          this.districtList.push(item)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询医院列表
    getList() {
      hosp.getHospitalList(this.hospital).then(res => {
        res.data.content.forEach(item => {
          this.list.push(item)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    hostypeSelect(hostype, index) {
      this.list = []
      this.hostypeActiveIndex = index
      this.hospital.hostype = hostype
      this.getList()
    },
    districtSelect(districtCode, index) {
      this.list = []
      this.provinceActiveIndex = index
      this.hospital.districtCode = districtCode
      this.getList()
    },
    querySearchAsync(queryString, cb) {
      this.hospital = {}
      this.hospital.hosname = queryString
      hosp.getHospitalByHosname(this.hospital).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].value = res.data[i].hosname
        }
        cb(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    handleSelect(item) {
      window.location.href = '/hosp/' + item.hoscode
    },
    show(hoscode) {
      window.location.href = '/hosp/' + hoscode
    }
  }
}
</script>
