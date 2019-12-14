<template>
    <div class="app-dialog">
        <el-dialog title="添加用户" :visible.sync="popShow" width="470px" center @close="closePop()">
            <div class="dialog-body role">               
                 <el-form v-loading="loading" :model="popData" :rules="rules" ref="popData" label-width="100px"  :inline-message='true'>
                    <el-form-item label=" 用户名：" prop="userName">
                        <el-input v-model="popData.userName" placeholder="请输入角色说明" style="width:280px;"></el-input>
                    </el-form-item>    
                    <el-form-item label=" 选择角色：" prop="power">
                        <el-select v-model="popData.power" placeholder="请选择" style="width:280px;" @change="checkProp">
                            <el-option
                                v-for="item in powerData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
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
import { addUserPower } from '@/api/power-user'
export default {
    props:{
        pop: {
            type: Object,
            default:() => { return {} }
        },
        sysType: {
            default:''
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
            powerData: [],
            popData: {
                userName: '',
                power: ''
            },
            rules: {
                power: [{ required: true, message: '请选择角色', trigger: 'blur' }],
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
            }              
        };
    },
    mounted() {
        this.$store.dispatch('GETOpenPowerList').then(data => {
            this.powerData = data
        })
    },
    methods: { 
        checkProp() {
            this.$nextTick(() => {
                this.$refs.popData.validateField('power');
            })
        },
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
            let opt = Object.assign({}, this.popData)
            opt.sysType = this.sysType;
            addUserPower(opt).then(res => {
                this.loading= false
                if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                this.$message.success('操作成功！')
                this.closePop(1)
            }).catch(() => { this.loading= false })
        },      
        closePop(val) {
            this.popData = {
                userName: '',
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