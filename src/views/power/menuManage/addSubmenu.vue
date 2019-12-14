<template>
    <div class="app-dialog menu-pop">
        <el-dialog :title=" type ? '修改子菜单' : '添加子菜单'" :visible.sync="popShow" width="500px" center @close="closePop()">
            <div class="dialog-body role" v-loading='loading'>               
                 <el-form  ref="ruleForm" label-width="120px"  :inline-message='true' :model="popData" :rules="subMenuRules">
                    <el-form-item label=" 菜单名称：" prop="nameinfo" >
                        <el-input v-model="popData.nameinfo" placeholder="请输入菜单名称" style="width:280px;"></el-input>
                    </el-form-item>
                    <el-form-item label=" 菜单地址：" prop="url">
                        <el-input v-model="popData.url" placeholder="请输入菜单地址" style="width:280px;"></el-input>
                    </el-form-item>    
                    <el-form-item label=" 所属主菜单：" prop="parentid" >
                        <el-select v-model="popData.parentid" @change="checkCotrl()"
                        placeholder="请选择所属主菜单" style="width:280px;">
                            <el-option
                                v-for="opt in parentUrl"
                                :key="'select'+opt.value"
                                :label="opt.label"
                                :value="opt.value">
                            </el-option>
                        </el-select>
                    </el-form-item>            
                    <el-form-item label=" 排序："  prop="index">
                        <el-input v-model.number="popData.index" placeholder="请输入序号" style="width:280px;"></el-input>
                    </el-form-item> 
                    <el-form-item label=" 侧边栏显示：" >
                        <el-select v-model="popData.menustate" placeholder="控制显示状态" style="width:280px;">
                            <el-option label="显示" value="1"></el-option>
                            <el-option label="隐藏" value="0"></el-option>
                        </el-select>
                    </el-form-item>  
                    <div class="tc" style="margin-top:40px;">
                        <el-button type="primary" class="submit-102w36" round @click="toDo()">确定</el-button>          
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
        tableData: {
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
                    this.popData.nameinfo = value.data.nameinfo
                    this.popData.parentid = value.data.parentid
                    this.popData.url = value.data.url
                    this.popData.index = value.data.index
                    this.popData.menustate = value.data.menustate
                } else this.type = 0;
            },
            deep: true
        },
        tableData: {
            handler(data) {
                this.parentUrl = [];
                data.forEach(element => {
                    this.parentUrl.push({
                        value: element.id,
                        label: element.nameinfo
                    })
                });
            }
        }
    },
    data() {
        return {                               
            popShow: false,
            type: '',
            parentUrl: [],
            loading: false,
            popData: {
                nameinfo: '',
                parentid: '',
                url: '',
                index: '',
                menustate: '1'
            },
            subMenuRules:{
                nameinfo:[
                    { required:true, message:"菜单名称不能为空", triggle:'blur' },
                    { min:2, message:"菜单名称不能小于2个字符", triggle:'blur' }
                ],
                url:[
                      { required:true, message:"菜单url不能为空", triggle:'blur' }
                ],
                index:[
                      { required:true, type:"number", message:"菜单排序不能为空", triggle:'blur' }
                ],
                parentid:[
                     { required:true, message:"所属主菜单不能为空", trigger: 'blur' }
                ]
            }
        };
    },
    methods: { 
        toDo() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.toSubmit();
                } else {
                    return false
                }
            });
        }, 
        toSubmit() {
            this.loading = true;
            this.choseMethod().then((res) => {
                this.loading = false;
                if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                this.$message.success('操作成功！')
                this.closePop(1)
            }).catch(() => { this.loading = false })
        },
         checkCotrl() {
            this.$nextTick(() => {
                this.$refs.ruleForm.validateField('parentid');
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
                nameinfo: '',
                parentid: '',
                url: '',
                index: '',
                menustate: '1'
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
