<template>
    <div class="app-dialog menu-pop">
        <el-dialog :title=" type ? '修改主菜单' : '添加主菜单'" :visible.sync="popShow" width="470px" center @close="closePop()">
            <div class="dialog-body role" v-loading='loading'>               
                 <el-form  ref="ruleForm" label-width="100px"  :inline-message='true' :rules="menuRule" :model="popData">
                    <el-form-item label=" 菜单名称：" prop="nameinfo" >
                    <el-input v-model="popData.nameinfo" placeholder="请输入菜单名称" style="width:280px;"></el-input>
                    </el-form-item>              
                    <el-form-item label=" 排序：" prop="index" >
                    <el-input v-model.number="popData.index" placeholder="请输入序号" style="width:280px;"></el-input>
                    </el-form-item>
                    <el-form-item label=" 侧边栏显示：" >
                        <el-select v-model="popData.menustate" placeholder="控制显示状态" style="width:280px;">
                            <el-option label="显示" value="1"></el-option>
                            <el-option label="隐藏" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图标：">
                        <menu-icon-select :chose="popData.img" @dataReturn="choseImg"></menu-icon-select>
                    </el-form-item>
                    <div class="tc" style="margin-top:40px;">
                        <el-button type="primary" class="submit-102w36" round @click="toSubmit()">确定</el-button>          
                    </div>
                 </el-form>                 
            </div>
        </el-dialog>
    </div>
</template>
<script>
import menuIconSelect from '@/components/menuIconSelect/index'
import { addUrl, updateUrl } from '@/api/power-url'
export default {
    components:{
       menuIconSelect
    },
    props:{
        pop: {
            type: Object,
            default:() => { return {} }
        },
        menutype: {
            default: ''
        }
    },
    watch: {
        pop:{
            handler(value) {
                this.popShow = value.show;
                if (!value.show) return; 
                if (value.data) {
                    this.type = 1;
                    this.popData.id = value.data.id
                    this.popData.img = value.data.img
                    this.popData.nameinfo = value.data.nameinfo
                    this.popData.parentid = value.data.parentid
                    this.popData.index = value.data.index
                    this.popData.menustate = value.data.menustate
                } else {
                    this.type = 0;
                    this.popData.menutype = this.menutype
                }
            },
            deep: true
        }
    },
    data() {
        return {                               
            popShow:false,
            type: '',
            loading: false,
            popData: {
                img: 0,
                nameinfo: '',
                parentid: 0,
                menustate: '1',
                index: ''
            },
            menuRule:{
                nameinfo:[
                    { required:true, message:"菜单名称不能为空", triggle:'blur' }
                ],
                index:[
                    { required:true, type:"number", message:"菜单排序不能为空", triggle:'blur' }
                ]
            }
        };
    },
    methods: {  
        toDo() {
            this.loading = true;
            this.choseMethod().then((res) => {
                this.loading = false;
                if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                this.$message.success('操作成功！')
                this.closePop(1)
            }).catch(() => { this.loading = false })
        },
        toSubmit() {
            this.$refs['ruleForm'].validate((vaild) => {
                if (vaild) {
                    this.toDo();
                } else {
                    console.log("error submit!!");
                    return false
                }
            })
        },
        choseImg(val) {
            this.popData.img = val
        },  
        choseMethod() {
            if (this.type) return updateUrl(this.popData)
            return addUrl(this.popData)
        },
        popInit(opt) {
            this.popData = {
                img: '',
                nameinfo: '',
                parentid: 0,
                menustate: '1',
                index: ''
            }
        },
        closePop(val) {        
            this.popInit();
            this.$refs['ruleForm'].resetFields();   
            this.$emit('closePop', val);
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
