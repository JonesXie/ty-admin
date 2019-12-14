<template>
<div class="">
    <div class="lineMid logist-search-bar">
        <topSearchMod :searchData="topSearchData" :toClear="false" @toSearch="toSearch"></topSearchMod>
    </div>
    <div class="">
        <el-button  type="success" round class="submit-120w36 mtb30" @click="temChose(1)">
        <i class="el-icon-plus"></i> 新增模板
        </el-button>
    </div>
    <applyTable :tableData="tableData" v-loading="loading" @refresh="toSearch()" @toUpdata="toUpdata"></applyTable>
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
import applyTable from './applyTable'
import { mapGetters } from 'Vuex'
import { getExpressModels } from '@/api/setting'
export default {
    name: 'logisticTools',
    components:{
         topSearchMod, applyTable
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data() {
        return {                 
            topSearchData: {
                modelName: {
                    title: '模板名称：',
                    type: 'text',
                    placeholder: '输入模板名称搜索'
                },
                date: {
                    title: '时间：',
                    type: 'date',
                    Rename: ['beginTime', 'endTime']
                }
            },
            toSearchData: {},
            tableData: [],
            pagTotal: 0,
            loading: false
        };
    },
    mounted() {
        this.toSearch()
    },
    methods: {
        toUpdata(val) {
            this.temChose(1)
            this.$emit('toUpdata', val)
        },
        temChose(val) {
            this.$emit('toUpdata', '')
            this.$emit('temChose', val)
        },
        handleCurrentChange(val) {
            let opt = Object.assign({}, this.toSearchData);
            opt.pageNo = val - 1;
            this.getList(opt);
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
                this.pagTotal = data.count;
            })
        },
        getList(obj, callback) {
            let opt = {
                init: false, //分页获取 true获取个数，false获取记录
                pageNo: 0,
                pageSize: 10,
                userid: this.user.userId
            }
            opt = Object.assign(opt, obj);
            this.loading = true;
            getExpressModels(opt).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            this.tableData = data.list;
        }
    }
};
</script>


