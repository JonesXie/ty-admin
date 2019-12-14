<template>
    <div class="app-dialog">
        <el-dialog title="" :visible.sync="popShow" width="450px" center @close="closePop()" class="no-title">
            <div class="dialog-body role" v-loading="loading">               
                <div class="tc">                   
                   <h3>删除用户</h3> 
                   <p>删除当前系统用户后，法进行登录及其他操作,确认删除？</p>
                </div>                                                                       
                <div class="tc" style="margin-top:60px;">
                    <el-button type="primary" class="submit-102w36" round @click="stopApi()">确定</el-button>     
                    <el-button type="danger" class="submit-102w36" round @click="closePop()">取消</el-button>     
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { deleteUserPower } from '@/api/power-user'
export default {
    props:{
        pop: {
            type: Object,
            default:() => { return {} }
        },
        sysType: {
            default: ''
        }
    },
    watch: {
        pop:{
            handler(value) {
                if (!value.show) return;  
                this.popShow = value.show;
                this.data = value.data              
            },
            deep: true
        }
    },
    data() {
        return {                               
            popShow:false,
            loading: false,
            data: ''            
        };
    },
    methods: {       
        closePop(val) {
            this.popShow = false;
            this.$emit('closePop', val)
        },
        stopApi() {
            this.loading = true;
            deleteUserPower({
                userid: this.data.userid,
                sysType: this.sysType
            }).then(res => {
                this.loading = false;
                if (res.data.errno <= 0) return this.$message.error(res.data.msg);
                this.$message.success('操作成功');
                this.closePop(1)
            }).catch(() => { this.loading = false; })
        }
    }
};
</script>

<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.role{    
    padding-top:5px;
    padding-bottom: 20px;
    .tip-icon{
        font-size: 72px;
        color: #FD694C;
    }
    h3{
        font-size: 18px;
        color: #333;
        margin: 40px 0 20px;
        line-height: 1;
    }
    p{
        color: #FF5C5C;
        font-size: 14px;
    }
    .el-button+.el-button{
        margin-left:70px;
    }  
}
</style>

