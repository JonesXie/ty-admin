<template>
    <div class="app-dialog">
        <el-dialog title="添加接口" :visible.sync="popShow" width="500px" center @close="closePop()">
            <div class="dialog-body role">               
                 <el-form v-loading="loading" :model="popData"  ref="popData" :rules="rules" label-width="160px"  :inline-message='true'>
                    <el-form-item label="接口名称：" prop="name">
                         <el-input v-model="popData.name" placeholder="请输入接口名称" style="width:260px;"></el-input>
                    </el-form-item>    
                    <el-form-item  label="接口唯一标识：" prop="apikey">
                         <el-input v-model="popData.apikey" placeholder="请输入接口名称" style="width:260px;"></el-input>
                    </el-form-item> 
                     <el-form-item label="接口url：" prop="apiurl">
                        <el-input v-model="popData.apiurl" placeholder="请输入接口url" style="width:260px;"></el-input>
                        <p>格式： method url</p>
                    </el-form-item>  
                    <el-form-item label="新建Controller:" >
                        <el-radio-group v-model="creat">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>   
                     <el-form-item label="接口所属Controller：" prop="controller">
                        <el-input v-if="creat" v-model="popData.controller" placeholder="请输入controller" style="width:260px;"></el-input>
                        <el-select v-else v-model="popData.controller" @change='checkCotrl'
                        placeholder="请选择接口所属Controller" style="width:260px;">
                            <el-option
                                v-for="opt in controllerArray"
                                :key="'select'+opt.value"
                                :label="opt.label"
                                :value="opt.value">
                            </el-option>
                        </el-select>
                    </el-form-item>   
                     <el-form-item label="接口描述：" prop="description">
                        <el-input v-model="popData.description"  placeholder="" style="width:260px;"></el-input>
                    </el-form-item>                                                        
                    <div class="tc" style="margin-top:40px;">
                        <el-button type="primary" class="submit-102w36" round @click="toAddApi()">确定</el-button>          
                    </div>
                 </el-form>                 
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addApi } from '@/api/power-apiUrl'
export default {
    props:{
        pop: {
            type: Object,
            default:() => { return {} }
        },
        sysType: {
            default: ''
        },
        controller: {
            default: []
        }
    },
    watch: {
        pop:{
            handler(value) {
                this.popShow = value.show;
                if (!value.show) return;                
            },
            deep: true
        },
        controller: {
            handler(value) {
                this.controllerArray = Array.from(new Set(value));
                this.controllerArray.splice(0, 1);
            },
            deep: true
        }
    },
    data() {
        return {                               
             popShow:false,
             controllerArray: [],
             loading: false,
             creat: 0,
             popData: {
                "apikey": "", //api的唯一标识
                "apiurl": "", //api的url
                "controller": "", //api所在的controller
                "description": "", //api的描述
                "name": "" //api名称
             },       
             rules: {
                name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                apikey: [{ required: true, message: '请输入唯一标识', trigger: 'blur' }],
                apiurl: [{ required: true, message: '请输入url', trigger: 'blur' }],
                controller: [{ required: true, message: '请确定所属', trigger: 'blur' }],
                description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
            }   
        };
    },
    mounted() {

    },
    methods: {   
        checkCotrl() {
            this.$nextTick(() => {
                this.$refs.popData.validateField('controller');
            })
        },
        subMit() {
            if (this.popData.apiurl.split(' ').length < 2) return this.$message.error('接口url格式错误')
            this.loading= true
            this.popData.sysType = this.sysType;
            addApi(this.popData).then(res => {
                this.loading= false
                if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                this.$message.success('操作成功！')
                this.closePop(1)
            }).catch(() => { this.loading= false })
        },
        toAddApi() {
            this.$refs['popData'].validate((valid) => {
                if (valid) {
                   this.subMit()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },    
        closePop(val) {
            this.popData = {
                "apikey": "",
                "apiurl": "", 
                "controller": "",
                "description": "", 
                "name": "" 
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
    padding-top:10px;    
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
