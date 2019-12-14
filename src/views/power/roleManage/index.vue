<template>
<div class="power-pg">
    <div class="section role-bar">
        <el-button type="success" class="submit-120w36" round @click="toPopSee('addRole')">
            <i><svg-icon icon-class="add-roleGroup"></svg-icon></i> 添加角色
        </el-button>
    </div>
    <div class="section role-table">
        <el-table v-loading="loading" :data="roleList" style="width: 100%" center>
            <el-table-column label="序号" width="80px" type="index"></el-table-column>
            <el-table-column prop="power" label="角色名称" width="250px"></el-table-column>
            <el-table-column prop="info" label="角色说明" ></el-table-column>
            <el-table-column prop="addTime" label="添加时间" width="200px">                 
                <template slot-scope="scope">
                    {{parseTime(scope.row.addtime)}}
                </template>
            </el-table-column>
            <el-table-column prop="state" label="角色状态">                
                <template slot-scope="role">
                    <span v-if="role.row.state===1" class="green">已启用</span>
                    <span v-if="role.row.state===0" class="red">已停用</span>
                </template>
            </el-table-column>
            <el-table-column prop="opreate" label="操作">
                <template slot-scope="scope">
                    <a class="blue" @click="toPopSee('updateInfo', scope.row)">修改说明</a>
                    <el-button v-if="scope.row.state===1" class="red"  type="text" @click="toPopSee('stopRole', scope.row)" >停用 </el-button>
                    <el-button v-if="scope.row.state===0" class="green"  type="text" @click="toPopSee('startRole', scope.row)" >启用 </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <add-role :pop = pop.addRole  @closePop="closePop('addRole', $event)"></add-role>      
    <start-role :pop = pop.startRole  @closePop="closePop('startRole', $event)"></start-role>      
    <stop-role :pop = pop.stopRole  @closePop="closePop('stopRole', $event)"></stop-role>      
    <updateInfo :pop = pop.updateInfo  @closePop="closePop('updateInfo', $event)"></updateInfo>      
</div>
</template>
<script>
import { getAllPowerList } from '@/api/power'
import { parseTime } from '@/utils'
import addRole from "./addRole.vue"
import startRole from "./startRole.vue"
import stopRole from "./stopRole.vue"
import updateInfo from "./updateInfo.vue"
export default {
    name: 'roleManage',
    components:{ addRole, startRole, stopRole, updateInfo },
    data() {
        return {
            roleList: [],
            loading: false,
            pop: {
                addRole: {
                    show: false,
                    data: ''
                },
                startRole: {
                    show: false,
                    data: ''
                },
                stopRole: {
                    show: false,
                    data: ''
                },
                updateInfo: {
                    show: false,
                    data: ''
                }
            }
        };
    },
    mounted() {
        this.getList()
    },
    methods: {
        parseTime,
        getList() {
            this.loading = true; 
            getAllPowerList().then(res => {
                this.loading = false;
                this.roleList = res.data
            }).catch(() => { this.loading = false })
        },
        closePop(name, val) {
            this.pop[name].show = false
            this.pop[name].data = ''
            if (val) {
                this.getList()
                this.$store.dispatch('delCachedView', 'roleList'); //关闭缓存
            }
        },
        toPopSee(name, data) {
            this.pop[name].show = true;
            this.pop[name].data = data;
        }
    }
};
</script>
<style lang="scss" scoped>
  @import "../power.scss";
</style>

