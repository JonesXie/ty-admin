<template>
<div class="menu-icon-radio">
    <el-radio-group v-model="choseIcon" @change='choseReturn' v-if="type === 0">
        <el-radio label="icon-user" border> <i><svg-icon icon-class="icon-user"></svg-icon></i></el-radio>
        <el-radio label="icon-order" border> <i><svg-icon icon-class="icon-order"></svg-icon></i></el-radio>
        <el-radio label="power-manage" border> <i><svg-icon icon-class="power-manage"></svg-icon></i></el-radio>
        <el-radio label="prod-weihu" border> <i><svg-icon icon-class="prod-weihu"></svg-icon></i></el-radio>
        <el-radio label="kuCun" border> <i><svg-icon icon-class="kuCun"></svg-icon></i></el-radio>
        <el-radio label="msg" border> <i><svg-icon icon-class="msg"></svg-icon></i></el-radio>
        <el-radio label="icon-setting" border> <i><svg-icon icon-class="icon-setting"></svg-icon></i></el-radio>
        <el-radio label="icon-check" border> <i><svg-icon icon-class="icon-check"></svg-icon></i></el-radio>
        <el-radio label="trade-manage" border> <i><svg-icon icon-class="trade-manage"></svg-icon></i></el-radio>
        <el-radio label="stock" border> <i><svg-icon icon-class="stock"></svg-icon></i></el-radio>
        <el-radio label="sell" border> <i><svg-icon icon-class="sell"></svg-icon></i></el-radio>
        <el-radio label="dashboard-nav1" border> <i><svg-icon icon-class="dashboard-nav1"></svg-icon></i></el-radio>  
        <el-radio label="dashboard-nav2" border> <i><svg-icon icon-class="dashboard-nav2"></svg-icon></i></el-radio>  
        <el-radio label="dashboard-nav3" border> <i><svg-icon icon-class="dashboard-nav3"></svg-icon></i></el-radio>  
        <el-radio label="dashboard-nav4" border> <i><svg-icon icon-class="dashboard-nav4"></svg-icon></i></el-radio>         
        <el-radio label="dashboard-nav5" border> <i><svg-icon icon-class="dashboard-nav5"></svg-icon></i></el-radio>  
        <el-radio label="dashboard-nav6" border> <i><svg-icon icon-class="dashboard-nav6"></svg-icon></i></el-radio>  
        <el-radio label="dashboard-nav7" border> <i><svg-icon icon-class="dashboard-nav7"></svg-icon></i></el-radio>         
        <el-radio label="remit-check" border> <i><svg-icon icon-class="remit-check"></svg-icon></i></el-radio> 
        <el-radio label="return-check" border> <i><svg-icon icon-class="return-check"></svg-icon></i></el-radio> 
    </el-radio-group>
    <div class="upImgs" v-else-if="type === 1">
        <imgs :initData="upImgIcon" :only="true" @returnData="choseReturn"></imgs>
    </div>
    <div class="upImgs" v-else-if="type === 2">
        <el-input style="width:280px;" placeholder="请输入类名或图片网址" v-model="choseIcon" @change='choseReturn'></el-input>
    </div>
    <div>
        <el-button @click="changeType(0)">选择图标</el-button> 
        <el-button @click="changeType(1)">上传图标</el-button> 
        <el-button @click="changeType(2)">手动输入</el-button> 
    </div>
</div>
</template>

<script>
import imgs from '@/components/formUpImgs'
export default {
  name: 'menu-icon-select',
  props: {
      chose: {
          default: 'icon-user'
      }
  },
  watch: {
        chose: {
            handler(val) {
                //val为空时做清空处理
                if (!val) {
                    this.type = '';
                    this.upImgIcon = []
                    this.choseIcon = ''
                    return
                }
                //val\type有值 保持type
                if (val && this.type !== '') return
                if (this.reg.test(val)) {
                    this.type = 1;
                    this.upImgIcon = [{
                        url: val
                    }]
                    return
                }
                this.type = 0;
                this.choseIcon = val;
            },
            deep: true,
            immediate: true
        }
  },
  components: {
      imgs
  },
  data() {
      return {
            reg: new RegExp('http'),
            choseIcon: "",
            upImgIcon: [],
            type: ''
      }
  },
  methods: {
        changeType(val) {
            this.type = val
        },
        choseReturn(val) {
            if (this.reg.test(val)) {
                this.upImgIcon = [{
                    url: val
                }]
                this.choseIcon = val
            } else {
                this.upImgIcon = []
            }
            this.$emit('dataReturn', val)
        }
  }
}
</script>
<style lang="scss" scoped>
.upImgs{
    margin-bottom: 10px;
}
</style>

