<template>
    <div class="app-dialog">
        <el-dialog :visible.sync="popShow" width="450px" center @close="closePop()" class="no-title">
            <div  v-loading="loading" class="dialog-body role">               
                <div class="tc">                    
                    <h3>停用角色</h3> 
                    <p>停用后当前角色下属用户将全部处于禁用状态，无法进行登录及其他操作,确认停用？</p>
                </div>                                                                       
                <div class="tc" style="margin-top:60px;">
                    <el-button type="primary" class="submit-102w36" round @click="toDo()">确定</el-button>     
                    <el-button type="danger" class="submit-102w36" round @click="closePop()">取消</el-button>     
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { closePower } from '@/api/power'
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
                this.popData = value.data               
            },
            deep: true
        }
    },
    data() {
        return {                               
            popShow:false,
            popData: '',
            loading: ''
        };
    },
    methods: { 
        toDo() {
            this.loading = true;
            closePower(this.popData.power).then((res) => {
                this.loading = false;
                if (res.data.errno <= 0) return this.$message.error(res.data.msg);
                this.$message.success('操作成功');
                this.closePop(1)
            }).catch(() => { this.loading = false; })
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
        max-width: 320px;
        margin: 0 auto;
        text-align: left;
        color: #FF5C5C;
        font-size: 14px;
    }
  
    .el-button+.el-button{
        margin-left:70px;
    }  
}
</style>

