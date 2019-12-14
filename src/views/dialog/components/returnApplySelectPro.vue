<template>
    <div class="app-dialog">
        <el-button type="link"  @click="returnApplySelectPro=true" style="width:150px;">选择商品-退货</el-button>

        <el-dialog title="选择商品-退货" :visible.sync="returnApplySelectPro" width="1208px" center>
            <div class="dialog-body cao_form return">               
            <el-form :inline="true" :model="topSearch" class="topMod">                 
                    <el-form-item label="">
                        <el-input v-model="topSearch.name" placeholder="请输入商品名称" style="width:160px;"></el-input>
                    </el-form-item>           
                    <el-form-item label="状态：">
                        <el-select v-model="topSearch.state" placeholder="请选择" class="searchDay" style="width:160px;">
                            <el-option
                                v-for="item in stateInfo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" round >查询</el-button>
                    </el-form-item>             
           </el-form>  
            <div class="ptb-ti">以下商品为商品库存列表：</div>
            <el-table border stripe :data="testTable"  class="tableMod" ref="tableMod" style="width:100%">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="t2" width="250" label="商品名称"  align="center"></el-table-column>
                <el-table-column prop="t3" label="商品类别"  align="center"></el-table-column>
                <el-table-column prop="t4" label="商品属性"  align="center"></el-table-column>                
                <el-table-column prop="t6" label="库存数量"  align="center"></el-table-column>
                <el-table-column label="进货单价（元）"  align="center"><template slot-scope="scope"><div class="red">￥{{scope.row.t7}}</div></template></el-table-column>
                <el-table-column label="进货总价（元）"  align="center"><template slot-scope="scope"><div class="red">￥{{scope.row.t8}}</div></template></el-table-column>
                <el-table-column label="状态"  align="center" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.t10 === 1">正常进货</div>
                        <div v-else-if="scope.row.t10 === 2" >用户退货</div>               
                    </template>
                </el-table-column>       
            </el-table>  
            <div class="jxc-page tr">
                <el-pagination
                background
                layout="prev, pager, next"
                :page-size="10"
                prev-text="上一页"
                next-text="下一页"
                :total="100">
                </el-pagination>
            </div>
            <div class="tc ft-button">
                <el-button type="primary" class="submit-102w36" round>选择</el-button>
            </div>     
         </div>
        </el-dialog>
      
    </div>
</template>


<style lang="scss" scoped>


</style>

<script>
export default {
    name: 'returnApplySelectPro',
  data() {
    return {
      returnApplySelectPro: false,
          topSearch: {
            name: "",
            state: ""
          },
          stateInfo: [
            {
              label: "全部",
              value: "all"
            },
            {
              label: "正常进货",
              value: "1"
            },
            {
              label: "用户退货",
              value: "2"
            }
          ],
          testTable: [
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t6: "6",
              t7: "100000.00",
              t8: "100000.00",
              t10: 1
            },
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t6: "6",
              t7: "100000.00",
              t8: "100000.00",
              t10: 2
            },
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t6: "6",
              t7: "100000.00",
              t8: "100000.00",
              t10: 1
            },
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t6: "6",
              t7: "100000.00",
              t8: "100000.00",
              t10: 1
            },
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t6: "6",
              t7: "100000.00",
              t8: "100000.00",
              t10: 2
            }
          ]
        };
      }
};
</script>