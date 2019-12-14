<template>
<el-form-item label="运费模板：" :prop="type ? 'modelId' : 'modelid'">
    <el-select v-model="yunfeiMod" @change='returnData'  default-first-option placeholder="请选择运费模板" style="width:228px;margin-right:21px;">
        <el-option v-for="item in tableData" :key="'modelid' + item.id" :label="item.modelname" :value="item.id">
        </el-option>
    </el-select>
    <el-button type="primary" v-loading="loading" round @click="getList()">刷新模板</el-button>
</el-form-item>
</template>
<script>
import { mapGetters } from 'Vuex'
import { getExpressModels } from '@/api/setting'
export default {
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data() {
        return {      
            init: false,
            tableData: [],
            yunfeiMod: '',
            loading: false
        };
    },
    props: {
        initData: {
            default: ''
        },
        type: {
            default: 0
        }
    },
    watch: {
        initData(val) {
            if (this.init) return
            this.init = true;
            this.yunfeiMod = val;
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        returnData(val) {
            this.$emit('returnData', val)
        },
        getList(obj, callback) {
            let opt = {
                init: false, //分页获取 true获取个数，false获取记录
                pageNo: 0,
                pageSize: 999,
                userid: this.user.userId
            }
            this.loading = true
            opt = Object.assign(opt, obj);
            getExpressModels(opt).then((res) => {
                this.loading = false
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => { this.loading = false })
        },
        applyList(data) {
            this.tableData = data.list;
        }
    }
};
</script>
<style lang="scss" scoped>
/* 运费模板 */
.s-title {
  font-size: 12px;
  color: #333;
  line-height: 1;
  vertical-align: middle;
  padding-right: 18px;
}
</style>


