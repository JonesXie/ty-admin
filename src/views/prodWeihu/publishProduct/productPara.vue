<template>
<el-form-item label="商品属性：">
    <div class="item-con">
        <template v-if="addBtn">
            <div class="add-attr">
                <el-input placeholder="请输入属性名称" v-model="addData.name" style="width:200px"></el-input>
                <el-input placeholder="请输入属性值" v-model="addData.value" style="width:220px"></el-input>
                <el-button type="primary" @click="toAddData()">确定</el-button>
            </div>
        </template>
        <template v-else>
            <el-button type="primary" class="submit-120w36" @click="addBtnShow(true)">
                <i class="el-icon-plus"></i>
                添加商品属性
            </el-button>
        </template>
        <div class="attr-form lineMid" >
            <div class="lineMid" v-for="(val, key) in Objlist" :key="key">
                <span>{{key}}：</span>
                <em>{{val}}</em>
                <i class="el-icon-error" @click="toDelData(key)"></i>
            </div>
        </div>
    </div>
</el-form-item>
</template>
<script>
export default {
    data() {
        return {
            init: false,
            addBtn: true,
            addData: {
                name: '',
                value: ''
            },
            Objlist: {

            }
        }
    },
    props: {
        initData: {
            default: ''
        }
    },
    watch: {
        initData(val) {
            if (this.init) return
            this.init = true;
            this.Objlist = val
        }
    },
    methods: {
        toDelData(key) {
            this.$delete(this.Objlist, key)
            this.$emit('returnData', this.Objlist)
        },
        toAddData() {
            if (!this.addData.name && !this.addData.value) return this.$message.error('属性名或属性值不能为空！')
            this.$set(this.Objlist, this.addData.name, this.addData.value)
            this.$emit('returnData', this.Objlist)
            this.addData = {
                name: '',
                value: ''
            }
        },
        addBtnShow(val) {
            this.addBtn = val
        }
    }
}
</script>
<style lang="scss" scoped>
.attr-form {   
    background-color: #f8f8f8;
    border-radius: 3px;
    margin-top:20px;
    >div {
        width: 45%;
        padding-right: 20px;
        padding-left: 10px;
        margin-bottom: 20px;
        font-size: 14px;
        span {
            min-width: 20%;
        }
        &:hover{
            background: #dfdfdf;
            .el-icon-error{
                display: block
            }
        }
        .el-icon-error{
            cursor: pointer;
            display: none;
            position: relative;
            top: 10px;
            float: right;
        }
    }
}
</style>


