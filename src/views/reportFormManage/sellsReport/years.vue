<template>
<div class="back-wrap report-form">
    <topSearchMod :searchData="topSearchData" :useExport="useExport" @toSearch="toSearch" @change="checkType"></topSearchMod>
     <div class="table-w">
        <h3 class="report-total">
            <span>
                合计：16.6万元
            </span>
        </h3>
        <table class="back-form prod-manage-tb" v-loading="loading">
            <colgroup>
                <col class="col-num">
                <col class="col-sellTime">
                <col class="col-proName">
                <col class="col-sort">
                <col class="col-proAttr">
                <col class="col-sellAccount">
                <col class="col-sellAmount">
                <col class="col-subtotal">
                <col class="col-seasonsTotal">                        
            </colgroup>
            
            <thead>
                <th>序号</th>
                <th class="">销售时间</th>
                <th> 商品名称 </th>
                <th> 商品类别 </th>
                <th>商品属性 </th>
                <th> 售出数量 </th>
                <th>销售总额（万元）</th>
                <th>小计（万元）</th>
                <th>季度合计（万元）</th>
            </thead>
            <tbody v-for="k in 2" :key="'year'+k">
                <tr class="tr-th">
                    <td class="th-title" colspan="7" style="border-right:none">
                        2018年销售统计
                    </td>
                    <td colspan="2" style="border-left:none">
                        年度销售总额：14526（万元）
                    </td>
                </tr>  

                                
                <tr class=" tr-td">
                    <td rowspan="2">{{1+(k-1)*3}}</td>
                        <td class="td-time" rowspan="2">
                        <span>2018-01-09<br>13:54</span>
                    </td>
                    <td>
                        <span class="">宇飞来F10</span>
                    </td>
                    <td>
                        <span>手机/数码</span>
                    </td>
                    <td >
                        <span>玫瑰金/64G</span>
                    </td>
                    <td>1</td>
                    <td><span class="red">0.32</span></td>
                    <td >
                        <span class="red">0.64</span>
                    </td>
                        <td rowspan="2">
                        <span class="red">1.24</span>
                    </td> 
                </tr>
                <tr class=" tr-td">                           
                    <td>
                        <span class="">宇飞来F10</span>
                    </td>
                    <td>
                        <span>手机/数码</span>
                    </td>
                    <td >
                        <span>玫瑰金/64G</span>
                    </td>
                    <td>1</td>
                    <td><span class="red">0.32</span></td>
                    <td >
                        <span class="red">0.64</span>
                    </td>                             
                </tr>
                <tr class=" tr-td">
                    <td rowspan="2">{{2+(k-1)*3}}</td>
                        <td class="td-time" rowspan="2">
                        <span>2018-01-09<br>13:54</span>
                    </td>
                    <td>
                        <span class="">宇飞来F10</span>
                    </td>
                    <td>
                        <span>手机/数码</span>
                    </td>
                    <td >
                        <span>玫瑰金/64G</span>
                    </td>
                    <td>1</td>
                    <td><span class="red">0</span></td>
                    <td rowspan="2">
                        <span class="red">0</span>
                    </td>
                        <td rowspan="2">
                        <span class="red">0</span>
                    </td> 
                </tr>
                <tr class=" tr-td">                           
                    <td>
                        <span class="">宇飞来F10</span>
                    </td>
                    <td>
                        <span>手机/数码</span>
                    </td>
                    <td >
                        <span>玫瑰金/64G</span>
                    </td>
                    <td>1</td>
                    <td><span class="red">0</span></td>
                                                
                </tr>
                <tr class=" tr-td">
                    <td rowspan="2">{{3+(k-1)*3}}</td>
                        <td class="td-time" rowspan="2">
                        <span>2018-01-09<br>13:54</span>
                    </td>
                    <td>
                        <span class="">宇飞来F10</span>
                    </td>
                    <td>
                        <span>手机/数码</span>
                    </td>
                    <td >
                        <span>玫瑰金/64G</span>
                    </td>
                    <td>1</td>
                    <td><span class="red">0</span></td>
                    <td >
                        <span class="red">0</span>
                    </td>
                        <td rowspan="2">
                        <span class="red">0</span>
                    </td> 
                </tr>
                <tr class=" tr-td">                           
                    <td>
                        <span class="">宇飞来F10</span>
                    </td>
                    <td>
                        <span>手机/数码</span>
                    </td>
                    <td >
                        <span>玫瑰金/64G</span>
                    </td>
                    <td>1</td>
                    <td><span class="red">0</span></td>
                    <td >
                        <span class="red">0</span>
                    </td>                             
                </tr>
            </tbody>
        </table>
    </div>
    <div class="jxc-page tc">
        <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        :total="pagTotal">
        </el-pagination>
    </div>
</div>
</template>
<script>
import topSearchMod from '@/components/topSearch/index'
export default {
    name:"reportAnnualSeasons",
    components: {
        topSearchMod
    },
    data() {
        return {
            topSearchData: {
                checkType: {
                    title: '筛选：',
                    type: 'select',
                    placeholder: '产品季度/年度报表',
                    data: [{
                        label: '产品基本报表',
                        value: 1
                    }, {
                        label: '产品年度报表',
                        value: ''
                    }]
                },
                proName: {
                    title: '商品名称：',
                    type: 'text',
                    placeholder: '请输入商品名称'
                },
                date: {
                    title: '时间：',
                    type: 'date',
                    dateType: 'year',
                    format: 'yyyy'
                }
            },        
            toSearchData: {},
            tableData: [],
            pagTotal: 0,
            useExport: '',
            loading: false //实际使用true
        }
    },
    methods: {
        checkType(val) {
            this.$nextTick(() => {
                if (val.checkType === 1) this.$emit('changeType', 1);
            })
        },
        handleCurrentChange(val) {
            let opt = Object.assign({}, this.toSearchData);
            opt.pageNo = val - 1;
            // this.getList(opt)
        },
        toSearch(opt) {
            opt ? this.toSearchData = opt : opt = this.toSearchData;
            // this.pagTotal = 0;
            //this.getTotal(opt)
            // this.getList(opt)
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




