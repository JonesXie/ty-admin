<template>
<div class="back-wrap report-form">
    <!-- <el-form :inline="true" :model="topSearch" class="topMod">
        <div class=" clearfix">
             <el-form-item >
                <el-input v-model="topSearch.name" placeholder="单号/用户名称/身份"></el-input>
            </el-form-item>
            <el-form-item label="提交时间:">
                <el-date-picker
                    v-model="choseDay"
                     type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:280px;">
                </el-date-picker>
            </el-form-item> 
             <el-form-item label="分类">
                <el-select v-model="topSearch.sort" placeholder="请选择" class="searchDay">
                    <el-option
                        v-for="item in sortInfo"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>           
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" round>查询</el-button>
                <el-button type="success"  round>
                    <i><svg-icon icon-class="icon-clean"></svg-icon></i>
                    <span>清空</span>
                </el-button>
            </el-form-item>
            <el-form-item class="fr">
                 <el-button type="success"  round plain>
                    <i><svg-icon icon-class="icon-export"></svg-icon></i>
                    <span>导出</span>
                </el-button>
            </el-form-item>
        </div>
    </el-form>
     <div class="table-w">
         <el-table border stripe :data="testTable"  class="tableMod" ref="tableMod"  style="width:100%">
        <el-table-column fixed prop="t1" label="序号"  align="center" width="60px"></el-table-column>
        <el-table-column fixed prop="t3" label="用户账号"  align="center"></el-table-column>
        <el-table-column prop="t4"  label="用户名称"  align="center">     </el-table-column>
        <el-table-column prop="t5" label="用户身份"  align="center"></el-table-column>
        <el-table-column  label="用户地址"  align="center" width="200px">
                <template slot-scope="scope"><div class="address">{{scope.row.t6}}</div></template>
        </el-table-column>     
         <el-table-column  label="订单内容"  align="center" width="80px">
            <template slot-scope="scope">
                <el-button type="text" @click="openOrderCon()" class="blue">查看</el-button>
            </template>        
        </el-table-column> 
        <el-table-column label="金额（万元）"  align="center" width="120px">
            <template slot-scope="scope"><div class="">{{scope.row.t8}}</div></template>
        </el-table-column>
         <el-table-column prop="t9" label="分类"  align="center" width="120px">            
         </el-table-column>
          <el-table-column  label="备注"  align="center" width="80px">
            <template slot-scope="scope"><router-link to="scope.row.t10" class="blue">查看</router-link></template>       
         </el-table-column> 
        <el-table-column prop="t11" label="提交时间"  align="center"></el-table-column>
        <el-table-column fixed="right"  label="操作"  align="center" width="80px">
            <template slot-scope="scope"><router-link to="scope.row.t12" class="green">退款</router-link></template>        
        </el-table-column>      
    </el-table>
     </div>
    <div class="jxc-page tc">
        <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        :total="100">
        </el-pagination>
    </div>
      <pop-order-con :pop = popOrderCon @closePop ="closePop('popOrderCon')"></pop-order-con> -->
      待开发
</div>
</template>
<script>
import popOrderCon from '@/components/popOrderSee'
export default {
    name:"waitRefund",
    components:{
        popOrderCon 
    },
    data() {
        return {
            topSearch: {
                name:'',
                sort:''
            },
             sortInfo: [{
                label: '全部',
                value: 'sort1'
            },
            {
                label: '线下进货',
                value: 'sort2'
            }],
            seasonsList: [{
                label: '产品季度/年度报表',
                value: 'season'
            },
            {
                label: '产品基本报表',
                value: 'base'
            }],
           testTable: [{
                t1: '1',
                t2: '123456789661425', //订单号
                t3: 'DD23023352002', //用户账号
                t4: '铜陵市营业厅', //用户名称
                t5: '营业厅', //用户身份
                t6: '安徽省合肥市高新技术开发区黄山路188号', //用户地址
                t7: '####', //订单内容
                t8: '56.36', //订单金额
                t9: '退货', //订单分类
                t10: '####', //备注
                t11: '2018-05-20', //下单时间
                t12: '####' //发货操作   
            }, {
                t1: '2',
                t2: '123456789661425',
                t3: 'DD23023352002', //用户账号
                t4: '铜陵市营业厅', //用户名称
                t5: '营业厅', //用户身份
                t6: '安徽省合肥市高新技术开发区黄山路188号', //用户地址
                t7: '####', //订单内容
                t8: '56.36', //订单金额
                t9: '退货', //订单分类
                t10: '####', //备注
                t11: '2018-05-20', //下单时间
                t12: '####' //发货操作   
            }, {
                t1: '3',
                t2: '123456789661425',
                t3: 'DD23023352002', //用户账号
                t4: '铜陵市营业厅', //用户名称
                t5: '营业厅', //用户身份
                t6: '安徽省合肥市高新技术开发区黄山路188号', //用户地址
                t7: '####', //订单内容
                t8: '56.36', //订单金额
                t9: '退货', //订单分类
                t10: '####', //备注
                t11: '2018-05-20', //下单时间
                t12: '####' //发货操作   
            }, {
                t1: '4',
                t2: '123456789661425',
                t3: 'DD23023352002', //用户账号
                t4: '铜陵市营业厅', //用户名称
                t5: '营业厅', //用户身份
                t6: '安徽省合肥市高新技术开发区黄山路188号', //用户地址
                t7: '####', //订单内容
                t8: '56.36', //订单金额
                t9: '退货', //订单分类
                t10: '####', //备注
                t11: '2018-05-20', //下单时间
                t12: '####' //发货操作   
            }],
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
             },
            loading: false, //实际使用true
             popOrderCon: {
                show: false
            }
        }
    },
    methods: {
       closePop(name) {           
            this[name].show = false
        },       
        openOrderCon() {
            this.popOrderCon.show =true
        }
      }
}

</script>

<style lang="scss" scoped>
.report-total{
    border:1px solid #e2e5ed;
    height: 52px;
    line-height: 50px;
    text-align: left;
    padding-left: 45px;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: -1px;
    margin-top:20px;
}
</style>




