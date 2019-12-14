<template>
    <el-select v-model="menuVal" placeholder="请选择" style="width:280px;" @change="returnData">
        <el-option
            v-for="item in menus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
</template>
<script>
import { getExpressCompay } from '@/api/setting'
export default {
    props:{
        clear: {
            default: ''
        }
    },
    watch: {
        clear(val) {
            if (!val) this.menuVal = "";
        }
    },
    computed: {

    },
    data() {
        return {                               
            shipData:[],            
            menuVal:"",
            menus: []             
        };
    },
    mounted() {
        getExpressCompay({
            state: 1
        }).then((res) => {
            res.data.forEach((element, index) => {
                if (element.state === 1) {
                    this.menus.push({
                        value: index,
                        label: element.company
                    })
                }
                this.shipData.push({
                    "code": element.code,
                    "company": element.company,
                    "company_en": element.companyEn
                })
            });
        })
    },
    methods: {           
        returnData() {
            this.$emit('returnData', this.shipData[this.menuVal])
        }
    }
};
</script>
