<template>
    <el-cascader :placeholder="placeholder" :options="options" class="selectAreaForm"
        @active-item-change="handleItemChange"
        v-model="optData" @change="setData"
    ></el-cascader>
</template>
<script>
import { mapGetters } from 'vuex'
import { getFirstProClass, getSecondProClass, getThirdProClass } from '@/api/product'
export default {
    name: 'formSelectProClass',
    props: {
        initData: {
            default: ''
        },
        clear: {
            default: ''
        }
    },
    computed: {
        ...mapGetters([
            'proClassOptions'
        ])
    },
    watch:{
        clear:{
            handler(value) {
                if (!value) this.optData = []
            },
            deep: true
        }
    },
    data() {
        return {
            options: [],
            optData:[],
            placeholder:'请选择商品类目',
            reData: ''
        }
    },
    mounted() {
        if (!this.proClassOptions) this.getFir()
        else this.options = this.proClassOptions
        if (this.initData) this.placeholder = this.initData.placeholder
    },
    methods: {
        setData(val) {
            this.reData = val[val.length - 1].proclassSort;
            this.$emit('returnData', this.reData)
            this.$emit('returnDataTxt', val[val.length - 1].proclassName)
        },
        //选择
        handleItemChange(val) {
            let length = val.length - 1;
            if (length === 0) this.getSec(val)
            if (length === 1) this.getThird(val)
        },
        addData(data, type) {
            let opt = [];
            data.forEach((ele, inx) => {
                let child = {
                    label: ele.proclassName,
                    value: {
                        inx: inx,
                        proclassName: ele.proclassName,
                        proclassSort: ele.proclassSort
                    }
                }
                if (!type) child.children = [];
                opt.push(child)
            });
            return opt;
        },
        getFir() {
            getFirstProClass().then((res) => {
                let data = res.data;
                this.options = this.addData(data)
                this.$store.dispatch('proClassOptionsUp', this.options)
            })
        },
        getSec(val) {
            val = val[0];
            if (this.options[val.inx].children.length > 0) return
            getSecondProClass(val.proclassSort).then((res) => {
                let data = res.data;
                this.options[val.inx].children = this.addData(data)
                this.$store.dispatch('proClassOptionsUp', this.options)
            })
        },
        getThird(val) {
            if (this.options[val[0].inx].children[val[1].inx].children.length > 0) return
            getThirdProClass(val[1].proclassSort).then((res) => {
                let data = res.data;
                this.options[val[0].inx].children[val[1].inx].children = this.addData(data, 1);
                this.$store.dispatch('proClassOptionsUp', this.options)
            })
        }
    }
}
</script>
<style>
.el-cascader.selectAreaForm{
    width: 260px;
}
</style>


