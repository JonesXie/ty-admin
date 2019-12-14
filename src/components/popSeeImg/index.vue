<template>
    <div class="app-dialog">
        <el-dialog title="查看凭证" :visible.sync="popShow" width="750px" center @close="closePop">
            <div class="dialog-body note">               
                <el-form  label-width="100px" class="jn-form" :inline-message='true'>
                  <el-form-item label="凭证图片：">
                    <ul class="voucher-list">
                        <li v-for="(src, inx) in imgList" :key="'imgSrc'+inx"><img :src="src" class="voucher" @click="handlePictureCardPreview($event)" ></li>
                        <!-- <li><img src="@/assets/404_images/404_cloud.png" class="voucher" @click="handlePictureCardPreview($event)" ></li> -->
                        <!-- <li><img src="@/assets/404_images/404.png" class="voucher" @click="handlePictureCardPreview($event)" ></li> -->
                    </ul>
                    <dialogImg :id="id" :pop="dialogVisible" @closePop="closeDialog"></dialogImg>
                  </el-form-item>   
                  <div class="tc" style="margin-top:50px;">
                      <el-button type="primary" class="submit-102w36" round @click="closePop" >确定</el-button>                  
                  </div>
                </el-form>                 
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import dialogImg from './dialogImage.vue'
    export default {
      props: {
        pop: {
          type: Object,
          default: () => { return {} }
        },
        id: {
          default: ''
        }
      },
      data() {
        return {
          imgList: [],
          dialogImageUrl: '',
          popShow: false,
          dialogVisible: {
            show: false
          }
        }
  },
      components: {
        dialogImg
      },
      watch: {
        pop: {
          handler(value) {
            this.popShow = value.show
            if (!value.show) return
            this.imgList = value.data.concat()
          },
          deep: true
        }
      },
      methods: {
        setImgStyle(key, val) {
          this.imgStyle[key] += val
        },
        closeDialog() {
          this.dialogVisible.show = false
        },
        closePop() {
          this.$emit('closePop')
        },
        handlePictureCardPreview(e) {
          this.dialogVisible.data = e.currentTarget.src
          this.dialogVisible.show = true
        }
      }
    }
</script>

<style lang="scss">
 .voucher-uploader {
    .el-upload {
      width: 78px;
      height: 78px;
      line-height: 76px;
      border-radius: 3px;
      border: 1px solid #E2E5ED;
      background-color: #fff;
      i {        
        font-size:40px;
        color:#dedede;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 78px;
      height: 78px;
      border-radius: 3px;
      margin: 0 16px 16px 0;
    }
}
.voucher-list{
  li{
  width: 78px;
  height: 78px;
  line-height:76px;
  text-align: center;
  display:inline-block;
  margin:0 16px 16px 0;
  border:1px solid #dedede;
  font-size: 0;
  &>img{
    max-width: 76px;    
    max-height: 76px;    
    display: inline-block;
    vertical-align: middle;
  }
  }
}

</style>

<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.note{    
    padding-top:15px;
    padding-bottom: 20px;
    .form-text{
        line-height: 18px;
        padding: 8px 0;
        max-width: 200px;
    }
    .el-form-item{
        margin-bottom: 19px;
        .el-input,.el-textarea,.el-select{
            width: 235px;
        }        
    }
    .el-button+.el-button{
        margin-left:126px;
    }  
}

</style>