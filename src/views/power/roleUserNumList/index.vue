<template>
<div class="power-pg">
    <!-- 角色对应账号列表 -->
    <div class="section role-bar">
        <span class="title">角色：<label class="blue">超级管理员</label></span>
    </div>
    <div class="section role-table">
            <el-table :data="roleList" style="width: 100%" center>
                <el-table-column label="序号" width="80px" type="index">                  
                </el-table-column>
                <el-table-column prop="roleName" label="账号" >
                <template slot-scope="role">
                    <span> {{role.row.usernum}}</span>
                </template>
                </el-table-column>
                <el-table-column prop="power" label="权限设置">
                    <template slot-scope="role">
                        <span class="yellow" v-if="role.row.power=='特殊权限'">特殊权限</span>  
                        <span v-else>普通权限</span>
                    </template>
                </el-table-column>
                <el-table-column prop="opreate" label="操作" width="250px;">
                    <template slot-scope="role">
                        <div class="" v-if="role.row.power=='特殊权限'">                       
                            <router-link to="" class="blue">修改 </router-link>
                            <el-button type="text" class="green">一键还原 </el-button>
                        </div>
                        <div v-else>
                            <router-link to="" class="blue">修改 </router-link>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
    </div>    
        
        <div class="section filter jxc-page tc">           
            <el-pagination
            background
           layout="prev, pager, next"
            :page-size="10"
            prev-text="上一页"
            next-text="下一页"
            :total="pagTotal"></el-pagination>           
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      pagTotal: 50,
      roleList: [
        {
          usernum: "1256369",
          power: "普通权限"
        },
         {
          usernum: "1256369",
          power: "特殊权限"
        },
        {
          usernum: "1256369",
          power: "普通权限"
        },
         {
          usernum: "1256369",
          power: "特殊权限"
        },
        {
          usernum: "1256369",
          power: "普通权限"
        },
         {
          usernum: "1256369",
          power: "特殊权限"
        },
        {
          usernum: "1256369",
          power: "普通权限"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
    @import "../power.scss";
</style>
