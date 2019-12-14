<template>
<div class="cao_form">
    <el-form :inline="true"  class="topMod">
        <div class="tr">           
            <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="toPopSee('addWuliuCompany')" round>添加</el-button>
            </el-form-item>
        </div>
    </el-form>
    <el-table border stripe :data="tableData" v-loading="loading"  class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column prop="code" label="公司编码"  align="center"></el-table-column>
        <el-table-column prop="company" label="公司名称"  align="center"></el-table-column>       
        <el-table-column prop="companyEn" label="公司名称缩写"  align="center"></el-table-column>
        <el-table-column  label="状态" prop="t4"  align="center">
         <template slot-scope="scope">               
                <span v-if="scope.row.state===1" class="green" >已启用</span>
                <span v-else class="gray" >未启用</span>                            
        </template>   
        </el-table-column>        
       <el-table-column  label="操作"  align="center" width="">
            <template slot-scope="scope">
                <a class="blue" v-if="scope.row.state === 0" @click="changeState(scope.row.id, 1)">启用</a>
                <a class="yellow" v-else @click="changeState(scope.row.id, 0)" >停用</a>
                <a class="red" @click="delExpress(scope.row.id)">删除</a>
            </template>       
         </el-table-column> 
    </el-table>
    <addWuliuCompany :pop = pop @closePop="closePop('addWuliuCompany')"></addWuliuCompany>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import addWuliuCompany from './addWuliuCompany'
import { getExpressCompay, updateExpressEnable, removeExPressCompany } from '@/api/setting'
export default {
    name: "wuliuCompany",
    components:{
        addWuliuCompany 
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data() {
        return {
            pop: {
                show: false,
                data:''
            },
            tableData: [],
            loading: false            
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        delExpress(id) {
            this.$confirm('确认删除?', '提示', { type: 'warning' }).then(() => {
                removeExPressCompany(id, this.user.userId).then((res) => {
                    if (res.data.flag > 0) return this.getList()
                    this.$message.error(res.data.msgInFo)
                })
            }).catch(() => {})
        },
        changeState(id, state) {
            let txt = state ? '启用' : '停用';
            this.$confirm('确认' + txt + '?', '提示', { type: 'warning' }).then(() => {
                updateExpressEnable({
                    id: id,
                    state: state,
                    userid: this.user.userId
                }).then((res) => {
                    if (res.data.flag === 1) return this.getList()
                    this.$message.error(res.data.msgInFo)
                })
            }).catch(() => {})
        },
        toPopSee(data) {
            this.pop.show = true;
            this.pop.data = data;
        },
        closePop(val) {
            this.pop.show = false;
            this.pop.data = '';
            if (val) this.getList()
        },
        getList(obj, callback) {
            let opt = {
                state:1
            }
            this.$store.dispatch('delCachedView', 'waitShips'); //关闭缓存
            opt = Object.assign(opt, obj);
            this.loading = true;
            getExpressCompay(opt).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            this.tableData = [];
            for (let item of data) {
                this.tableData.push({
                    id: item.id,
                    company: item.company,
                    code: item.code,
                    companyEn: item.companyEn,
                    state: item.state
                })
            }
        }
      }
}
</script>
<style lang="scss" scoped>

</style>




