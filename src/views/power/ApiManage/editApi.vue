<template>
    <div class="app-dialog">
        <el-dialog title="修改接口" :visible.sync="popShow" width="500px" center @close="closePop()">
            <div class="dialog-body role">               
                 <el-form v-loading="loading" ref="popData" label-width="160px"  :inline-message='true'>
                    <el-form-item label="接口名称：" >
                         <el-input v-model="popData.name" placeholder="请输入接口名称" style="width:260px;"></el-input>
                    </el-form-item> 
                     <el-form-item label="接口url：" >
                        <el-input v-model="popData.apiurl" placeholder="请输入接口url" style="width:260px;"></el-input>
                    </el-form-item>   
                     <el-form-item label="接口描述：" >
                        <el-input v-model="popData.description" placeholder="" style="width:260px;"></el-input>
                    </el-form-item>                                                        
                    <div class="tc" style="margin-top:40px;">
                        <el-button  type="primary" class="submit-102w36" round @click="update()">确定</el-button>          
                    </div>
                 </el-form>                 
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { alterApi } from '@/api/power-apiUrl'
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
                this.popData.name = value.data.name;         
                this.popData.apiurl = value.data.apiurl;         
                this.popData.description = value.data.description;         
                this.popData.apikey = value.data.apikey;         
            },
            deep: true
        }
    },
    data() {
        return {                               
            popShow:false,
            loading: false,
            popData: {
                apiurl: '',
                name: '',
                description: '',
                apikey: ''
            }
        };
    },
    methods: {       
        update() {
            this.$confirm('确认修改？', '提示', { type: 'warning' }).then(() => {
                this.loading = true;
                alterApi(this.popData).then(res => {
                    this.loading = false;
                    if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                    this.$message.success('操作成功！')
                    this.closePop(1)
                }) 
            }).catch(() => { this.loading = false })
        },
        closePop(val) {
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
