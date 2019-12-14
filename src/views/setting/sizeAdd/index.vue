<template>
<div class="back-wrap report-form SettingSizeAdd">
    <h2>新增分类规格</h2>
    <el-form v-loading="loading" ref="formData" label-width="150px"  :inline-message='true'>
        <el-form-item label="商品类目：">
            <formSeletctProClass @returnData="setProClass"></formSeletctProClass>
        </el-form-item>
        <el-form-item label="是否设置公有属性：" class="noBorder">
            <el-radio-group v-model="formData.common_attrbute">
                <el-radio :label="1">是（慎用）</el-radio>
                <el-radio :label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>  
        <template v-for="(attr, index) in formData.attr">
            <el-form-item :label="`属性名称${index+1}：`" class="variate" :key="'attr'+ index">
                <div class="lineMid">
                    <el-input v-model="attr.name" placeholder="请输入属性名称" style="width:180px;"></el-input>
                    <span class="el-icon-plus" @click="addRow(formData.attr)" v-if="index === 0"></span>
                    <span class="el-icon-error" @click="delArry(formData.attr, index)" v-else></span>
                    <div class="lineMid lineSec">
                        <div class="child" v-for="(child, inx) in attr.value" :key="'child' + inx">
                            <el-input v-model="child.tAttributeValueName" placeholder="属性值" style="width:180px;"></el-input>
                            <span class="el-icon-plus" @click="addChild(attr.value)" v-if="inx === 0"></span>
                            <span class="el-icon-error" @click="delArry(attr.value, inx)" v-else></span>
                        </div>
                    </div>
                </div>
            </el-form-item>  
        </template>
    </el-form>     
    <div class="btnSizeAdd">
        <el-button type="success" round style="width:120px;" @click="toSubMit()">保存并返回</el-button>
        <el-button  type="info"  round style="width:90px;" @click="closePage('/setting/size')">取消</el-button>          
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import topSearchMod from '@/components/topSearch/index'
import formSeletctProClass from '@/components/formSelectProClass/index'
import { addAttrbuteAndValues } from '@/api/product'
export default {
    name: "sizeAdd",
    components: {
        topSearchMod, formSeletctProClass
    },
    computed: {
        ...mapGetters([
            'user', 'visitedViews'
        ])
    },
    data() {
        return {
            formData: {
                common_attrbute: 0,
                proClass: '',
                attr: [{
                    name: '',
                    value: [{
                        tAttributeValueImg: '',
                        tAttributeValueName: ''
                    }]
                }]
            },
            rules: {

            },
            subMit: [{
                attribute: {
                    common_attrbute: 0,
                    proClass: '',
                    tAttributeName: ''
                },
                attribute_values: [{
                    tAttributeValueName: ''
                }]
            }],
            loading: false
        }
    },
    mounted() {
        // this.toSearch();
    },
    methods: {
        formInit() {
            this.formData.common_attrbute = 0;
        },
        setProClass(opt) {
            this.formData.proClass = opt;
            this.formData.attr = [{
                name: '',
                value: [{
                    tAttributeValueImg: '',
                    tAttributeValueName: ''
                }]
            }];
        },
        toSubMit() {
            this.subMit = [];
            let attr = this.formData.attr;
            let doNext = true;
            if (!this.formData.proClass) return this.$message.error('请选择商品类目！')
            for (let index in attr) {
                if (attr[index].name === '') {
                    doNext = false;
                    return this.$message.error('属性参数 ' + (parseInt(index) + 1) + '不能为空！')
                }   
                for (let inx in attr[index].value) {
                    if (attr[index].value[inx].tAttributeValueName === '') {
                        doNext = false;
                        return this.$message.error('属性值 ' + (parseInt(inx) + 1) + '不能为空！')
                    }
                }
                this.subMit.push({
                    attribute: {
                        common_attrbute: this.formData.common_attrbute,
                        proClass: this.formData.proClass,
                        tAttributeName: attr[index].name
                    },
                    attribute_values : Object.assign([], attr[index].value)
                })
            }
            if (!doNext) return
            this.doSubMit()
        },
        doSubMit() {
            this.$confirm('是否提交？', '提示', { type: 'warning' }).then(() => {
                addAttrbuteAndValues(this.subMit).then(res => {
                    if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                    this.$message.success('操作成功！')
                    this.formInit()
                    this.closePage('/setting/size')
                })
            }).catch(() => {})
        },
        addRow(arry) {
            arry.push({
                name: '',
                value: [{
                    img: '',
                    val: ''
                }]
            })
        },
        addChild(arry) {
            arry.push({
                tAttributeValueImg: '',
                tAttributeValueName: ''
            })
        },
        delArry(arry, index) {
            arry.splice(index, 1)
        },
        closePage(path) {
            this.visitedViews.forEach(element => {
                if (element.title === this.$options.name) {
                    this.$store.dispatch('delVisitedViews', element).then((views) => {
                        this.$router.push(path)
                    })
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.SettingSizeAdd{
    h2{
        font-size: 14px;
        font-weight: bold;
        color:#010101;
        padding:0 0 12px 30px;
        line-height: 1;
        border-bottom: 1px solid #E5E5E5
    }
    .btnSizeAdd{
        padding-bottom: 50px;
        padding-left: 75px;
        button+button {
            margin-left: 38px;
        }
    }
    .lineSec{
        display: inline-block;
    }
}
</style>
<style lang="scss">
.SettingSizeAdd{
    padding-bottom:200px;
    .el-form{
        padding-top:28px;
        padding-bottom:20px;
        margin-bottom:36px;
        border-bottom:1px solid #E5E5E5;
        .el-select{
            width: 200px;
            input{
                background:#F8F8F8;
            }
        }
        .el-icon-plus, .el-icon-error{
            padding:10px 11px 10px 8px;
            margin-right:15px;
            margin-bottom:10px;
            cursor: pointer;
        }
        .el-icon-error{
            color: #e5e5e5;
            &:hover {
                color:#f73b42
            }
        }
        .child{
            position: relative;
            margin-right:27px;
            .el-icon-plus, .el-icon-error{
                position: absolute;
                top:0;
                right: 0px;
                margin-right:0;
            }
            
        }
    }
    .el-form-item__label{
        padding: 0;
    }
    .el-form-item{
        margin-bottom:27px;
    }
    .el-form-item__content{
        padding-bottom:26px;
        padding-left:12px;
        border-bottom:1px solid #E5E5E5
    }
    .variate .el-form-item__content{
        padding-bottom:16px;
        input {
            margin-bottom:10px;
        }
    }
    .variate:last-child{
        .el-form-item__content{
            border:none
        } 
    }
    .noBorder {
        .el-form-item__content{
            border:none
        }        
    }
}
</style>