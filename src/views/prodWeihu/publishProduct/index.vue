<template>
<div class="back-wrap b-w">
    <div class="pro-srot-sel lineMid">
         <div class="topLine" style="padding-right:10px;">
            <span>商品类目： </span>
         </div>
        <el-form>
            <el-form-item label="">
                <formSelectProClass @returnData="setProClass" @returnDataTxt="setProName"></formSelectProClass>
            </el-form-item>
        </el-form>
        <div class="topLine">
            <el-button type="primary" round style="width:110px;" @click="toAddPro">
                <span>发布商品</span>
            </el-button>
        </div>
    </div>
</div>
</template>
<script>
import formSelectProClass from '@/components/formSelectProClass/index'
import topSearchMod from '@/components/topSearch/index'
export default {
    name: 'publishProduct',
    components: {
        topSearchMod, formSelectProClass
    },
    data() {
        return {
            topSearchData: {
                proClass: {
                    title: '商品类目：',
                    type: 'selectProClass',
                    placeholder: '请选择商品类目',
                    data: []
                }
            },
            toSearchData: {},
            proClass: '',
            proClassName: ''
        }
    },
    methods: {
        toAddPro(formName) {
            if (!this.proClass) return this.$message.error('请选择发布的类型')
            this.$router.push('/prodWeihu/publishProduct/' + this.proClass + '?proClassName=' + this.proClassName);
        },
        setProName(val) {
            this.proClassName = val
        },
        setProClass(val) {
            this.proClass = val
        }
    }
}
</script>
<style lang="scss" scoped>
    .topLine{
        margin-left: 20px;
        padding-bottom: 22px;
    }
</style>
