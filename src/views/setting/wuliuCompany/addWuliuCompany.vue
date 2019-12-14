<template>
    <div class="app-dialog ">
        <el-dialog title="添加物流公司" :visible.sync="popShow" width="470px" center @close="closePop()">
            <div class="dialog-body wuliu">               
                 <el-form  ref="wulie" :model="wulie" :rules="rules" label-width="140px"  :inline-message='true'>
                     <el-form-item label="公司编码：" prop="code">
                        <el-input v-model="wulie.code" placeholder="请输入公司编码" style="width:260px;"></el-input>
                    </el-form-item>              
                    <el-form-item label=" 公司名称：" prop="comPany">
                        <el-input v-model="wulie.comPany" placeholder="请输入公司名称" style="width:260px;"></el-input>
                    </el-form-item>  
                    <el-form-item label=" 公司名称缩写：" prop="company_en">
                        <el-input v-model="wulie.company_en" placeholder="请输入公司名称缩写" style="width:260px;"></el-input>
                    </el-form-item>   
                     <!-- <el-form-item label=" 启用状态：" >
                          <el-radio-group v-model="enableState">
                                <el-radio :label="0">立即启用</el-radio>
                                <el-radio :label="1">暂不启用</el-radio>                       
                          </el-radio-group>
                    </el-form-item>                                                         -->
                    <div class="tc" style="margin-top:50px;">
                        <el-button type="primary" class="submit-102w36" round @click="submitForm()">确定</el-button>    
                        <el-button type="danger" class="submit-102w36" round @click="closePop()">取消</el-button>       
                    </div>
                 </el-form>                 
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { addExpressCompany } from '@/api/setting'
export default {
    props:{
        pop: {
            type: Object,
            default:() => { return {} }
        }
    },
    computed: {
        ...mapGetters([
            'user'
        ])
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
            enableState:0,
            wulie: {
                code: '',
                comPany: '',
                company_en: ''
            },
            rules: {
                code:[
                    { required: true, message: '请输入公司编码', trigger: 'blur' }
                ],
                comPany:[
                    { required: true, message: '请输入公司名称', trigger: 'change' }
                ],
                company_en:[
                    { required: true, message: '请输入公司名称缩写', trigger: 'change' }
                ]
            }                     
        };
    },
    methods: {       
        closePop(val) {            
            this.$refs['wulie'].resetFields();
            this.$emit('closePop', val);
        },
        submitForm() {
            this.$refs['wulie'].validate((valid) => {
                if (valid) {
                    let opt = {
                        userid: this.user.userId
                    }
                    opt = Object.assign(opt, this.wulie)
                    addExpressCompany(opt).then((res) => {
                        if (res.data.flag > 0) {
                            this.wulie = {
                                code: '',
                                comPany: '',
                                company_en: ''
                            }
                            return this.closePop(1)  
                        }
                        this.$message.error(res.data.msgInFo) 
                    })
                } else {
                    return false;
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.wuliu{    
    padding-top:25px;
    padding-bottom: 20px;
    .form-text{
        line-height: 18px;
        padding: 8px 0;
        max-width: 240px;
    }
    .el-form-item{
        margin-bottom: 19px;
        .el-input,.el-textarea{
            width: 270px;
        }        
    }
    .el-button+.el-button{
        margin-left:42px;
    }  
}

</style>