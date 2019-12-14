<template>
    <div class="app-dialog">
        <el-button type="link"  @click="SelectProSell=true" style="width:150px;">选择商品-销售</el-button>

        <el-dialog title="选择商品-销售" :visible.sync="SelectProSell" width="1208px" center>
            <div class="dialog-body cao_form return">               
            <el-form :inline="true" :model="topSearch" class="topMod">                      
                    <el-form-item label="">
                        <el-input v-model="topSearch.name" placeholder="请输入商品名称" style="width:160px;"></el-input>
                    </el-form-item>           
                    <el-form-item label="进货日期：">
                        <el-date-picker
                            v-model="choseDay"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
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
                <el-table-column prop="t5" label="销售方式"  align="center"></el-table-column>                
                <el-table-column prop="t6" label="销售时间"  align="center"></el-table-column>                
                <el-table-column prop="t7" label="数量"  align="center"></el-table-column>
                <el-table-column label="销售单价（元）"  align="center"><template slot-scope="scope"><div class="red">￥{{scope.row.t8}}</div></template></el-table-column>
                <el-table-column label="销售总价（元）"  align="center"><template slot-scope="scope"><div class="red">￥{{scope.row.t9}}</div></template></el-table-column>
                <el-table-column label="备注"  align="center" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.t10 === 1" >--</div>
                        <div v-else-if="scope.row.t10 === 2" @click="noteLook = true" class="blue">查看</div>              
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
         <el-dialog title="备注信息" :visible.sync="noteLook" width="485px" center append-to-body>
            <div class="dialog-body note">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="modify-form" inline-message='true'>
                <el-form-item label=" 录入人员：">
                  <div class="form-text">李二包</div>
                </el-form-item>   
                <el-form-item label=" 客户姓名：">
                  <div class="form-text">孙🐒</div>
                </el-form-item>
                <el-form-item label=" 手机号码：">
                  <div class="form-text">13658864861</div>
                </el-form-item>
                <el-form-item label="其他信息：">
                  <div class="form-text">李家村扛把子，话说跟李二狗蛋是兄弟两个，还认识李铁蛋</div>
                </el-form-item>                                  
                <div class="tc" style="margin-top:50px;">
                     <el-button type="primary" class="submit-102w36" round >保存</el-button>                  
                </div>
                 </el-form>                 
            </div>
        </el-dialog>
        </el-dialog>
      
    </div>
</template>


<style lang="scss" scoped>

</style>

<script>
export default {
    name: 'SelectProSell',
  data() {
    return {
      SelectProSell: false,
      noteLook: false,
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
              t5:"线下销售",
              t6:"2018-03-09",
              t7: "6",
              t8: "100000.00",
              t9: "100000.00",
              t10: 2
            },
            {
              t1: "1",
              t2: "宇飞来F11",
              t3: "手机",
              t4: "宇飞来F11",
              t5:"线下销售",
              t6:"2018-03-09",
              t7: "595669",
              t8: "100000.00",
              t9: "100000.00",
              t10: 1
            },
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t5:"线下销售",
              t6:"2018-03-09",
              t7: "6",
              t8: "100000.00",
              t9: "100000.00",
              t10: 2
            },
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t5:"线下销售",
              t6:"2018-03-09",
              t7: "5969696",
              t8: "200000.00",
              t9: "300000.00",
              t10: 1
            },
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t5:"线下销售",
              t6:"2018-03-09",
              t7: "6",
              t8: "100000.00",
              t9: "100000.00",
              t10: 2
            },
            {
              t1: "1",
              t2: "宇飞来F10",
              t3: "手机",
              t4: "宇飞来F10",
              t5:"线下销售",
              t6:"2018-03-09",
              t7: "6",
              t8: "100000.00",
              t9: "100000.00",
              t10: 1
            }
          ],
            choseDay:'',
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
             }
        };
      }
};
</script>