<template>
    <div class="app-dialog">
        <el-dialog title="查看权限" :visible.sync="popShow" width="450px" center @close="closePop()" class="no-title">
            <div class="dialog-body role ">               
                <div class="scroll-box">
                    <div v-for="menu in popData" :key="'menu'+ menu.urlid" class="power-list-i"><i class=" green"><svg-icon icon-class="icon-sure"></svg-icon></i>{{menu.nameinfo}}</div> 
                </div>
                <div class="tc btnDiv">
                    <el-button type="primary" class="submit-102w36" round @click="closePop()">确定</el-button>     
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
            popShow: false,
            popData: ''             
        };
    },
    methods: {       
        closePop() {
            this.$emit('closePop')
        }
    }
};
</script>

<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.role {
    padding-top: 10px;
    padding-bottom: 80px;
    position: relative;
    .scroll-box {
        margin-right: -20px;
        max-height: 400px;
        overflow-y: auto;
    }
    .btnDiv {
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -51px;
    }
    .power-list-i{
        width: 50%;
    }
}

</style>

