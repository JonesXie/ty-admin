<template>
<div class="back-wrap report-form">
    <topSearchMod :searchData="topSearchData" :useExport="useExport" :useExportData="toSearchData" @toSearch="toSearch"></topSearchMod>
     <div class="table-w">
        <el-table border stripe :data="tableData" v-loading="loading"  class="tableMod" ref="tableMod"  style="width:100%">
            <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="proName" label="商品名称"  align="center"></el-table-column>
            <el-table-column prop="attr"  label="商品属性"  align="center"></el-table-column>
            <el-table-column prop="saleCount" label="售出数量"  align="center"></el-table-column>
            <el-table-column prop="sumCount" label="剩余库存"  align="center"></el-table-column>       
        </el-table>
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
import { getInventoryInventExCell, exportProInventBook } from '@/api/reportFormManage'
export default {
    name:"stockReport",
    components: {
        topSearchMod
    },
    data() {
        return {
            topSearchData: {
                proName: {
                    title: '商品名称：',
                    type: 'text',
                    placeholder: '请输入商品名称'
                }
            },
            toSearchData: {},
            tableData: [],
            pagTotal: 0,
            useExport: '',
            loading: false
        }
    },
    mounted() {
        this.toSearch();
        this.useExport = exportProInventBook()
    },
    methods: {
        handleCurrentChange(val) {
            let opt = Object.assign({}, this.toSearchData);
            opt.pageNo = val - 1;
            this.getList(opt)
        },
        toSearch(opt) {
            opt ? this.toSearchData = opt : opt = this.toSearchData;
            this.pagTotal = 0;
            this.getTotal(opt)
            this.getList(opt)
        },
        getTotal(opt) {
            opt = Object.assign({}, opt, { init: true });
            this.getList(opt, (data) => {
                this.pagTotal = data.page.count;
            })
        },
        getList(obj, callback) {
            let opt = {
                "init": false, //true获取记录，false获取记录个数
                "pageNo": 0,
                "pageSize": 10,
                "proName": "" //产品名称
            }
            opt = Object.assign(opt, obj);
            this.loading = true;
            getInventoryInventExCell(opt).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            let dataList = data.page.list;
            this.tableData = [];
            for (let item of dataList) {
                this.tableData.push({
                    proName: item.proName,
                    saleCount: item.saleCount,
                    attr: this.setAttr(item.list),
                    sumCount: item.sumCount
                })
            }
        },
        setAttr(data) {
            let str = ''
            data = data[0].list;
            let length = data.length - 1;
            data.forEach((element, index) => {
               str += element.key.tAttributeName + ': ';
               str += element.value.tAttributeValueName;
               if (length !== index) str += ' / ';
            });
            return str
        }
    }
}
</script>




