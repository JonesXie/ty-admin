<template>
    <div class="app-dialog popSeeBeiZhu">
        <el-dialog :title="title ? title : justSee ? '查看备注': '编辑备注'" :visible.sync="popShow" width="570px" center @close="closePop()" :modal="modal">
            <div class="dialog-body note">               
                 <el-form  ref="ruleForm" label-width="130px" class="modify-form" :inline-message='true'>
                    <el-form-item label=" 客户姓名：" v-if="!justInfo">
                    <el-input placeholder="请输入客户姓名" v-model="beizhu.userNickName" :disabled="justSee"></el-input>
                    </el-form-item>
                    <el-form-item label=" 手机号码：" v-if="!justInfo">
                    <el-input placeholder="请输入客户手机号" v-model="beizhu.telPhone" :disabled="justSee"></el-input>
                    </el-form-item>
                    <el-form-item :label="popLabel">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="您还可备注其他客户相关信息，方便客户回、访或者日后查看"
                        v-model="beizhu.info" :disabled="justSee">
                    </el-input>
                    </el-form-item>                                  
                    <div class="tc" style="margin-top:50px;">
                        <el-button type="primary" class="submit-102w36" round @click="popRetrun()">{{justSee?'确定' : '保存'}}</el-button>                  
                    </div>
                 </el-form>                 
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: {
    pop: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      default: ''
    },
    popLabel: {
      default: '备注信息：'
    },
    justInfo: {
      type: Boolean,
      default: false
    },
    justSee: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    pop: {
      handler(value) {
        this.popShow = value.show
        if (!value.show) return
        if (value.type === 1) {
          this.beizhu = Object.assign({}, value.data)
          return
        }
        if (typeof (value.data) === 'string') {
          this.beizhu.info = value.data
          return
        }
        this.beizhu = {
          info: '',
          telPhone: '',
          userNickName: ''
        }
      },
      deep: true
    }
  },
  data() {
    return {
      popShow: false,
      beizhu: {
        info: '',
        telPhone: '',
        userNickName: ''
      }
    }
  },
  methods: {
    popRetrun() {
      if (!this.justSee) this.$emit('popReturn', this.beizhu)
      this.$emit('closePop')
    },
    closePop() {
      this.$emit('closePop')
    }
  }
}
</script>
<style>
.popSeeBeiZhu .el-textarea.is-disabled .el-textarea__inner{
    background-color:#fff;
    color: #666;
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
        .el-input,.el-textarea{
            width: 300px;
        }        
    }
    .el-button+.el-button{
        margin-left:126px;
    }  
}

</style>