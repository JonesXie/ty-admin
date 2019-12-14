<template>
    <div class="app-dialog">
        <el-dialog title="添加角色" :visible.sync="popShow" width="470px" center @close="closePop()">
            <div class="dialog-body role">               
                 <el-form v-loading="loading" :model="popData" :rules="rules" ref="popData" label-width="100px"  :inline-message='true'>
                    <el-form-item label=" 角色名称：" prop="power">
                        <el-input v-model="popData.power" placeholder="请输入角色名称" style="width:280px;"></el-input>
                    </el-form-item>                                                           
                    <el-form-item label=" 角色说明：" prop="info">
                        <el-input v-model="popData.info" placeholder="请输入角色说明" style="width:280px;"></el-input>
                    </el-form-item>                                                           
                    <div class="tc" style="margin-top:60px;">
                        <el-button type="primary" class="submit-102w36" round @click="toAdd()">确定</el-button>          
                    </div>
                 </el-form>                 
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addPower } from '@/api/power'
export default {
    props:{
        pop: {
            type: Object,
            default:() => { return {} }
        }
    },
    watch: {
        pop:{
            handler(value) {
                this.popShow = value.show;
                if (!value.show) return;           
            },
            deep: true
        }
    },
    data() {
        return {                               
            popShow:false,
            loading: '',
            popData: {
                info: '',
                power: ''
            },
            rules: {
                info: [{ required: true, message: '请输入说明', trigger: 'blur' }],
                power: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            }              
        };
    },
    methods: { 
        toAdd() {
            this.$refs['popData'].validate((valid) => {
                if (valid) {
                   this.subMit()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        subMit() {
            this.loading= true
            addPower(this.popData).then(res => {
                this.loading= false
                if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                this.$message.success('操作成功！')
                this.closePop(1)
            }).catch(() => { this.loading= false })
        },      
        closePop(val) {
            this.popData = {
                info: '',
                power: ''
            };
            this.$refs['popData'].resetFields();
            this.$emit('closePop', val)
        }
    }
};
</script>

<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.role{    
    padding-top:35px;
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