<template v-if="addTemp==true">
    <div class="add-template">
         <el-form :inline="true" v-model="topSearch" class="mtb30">
                <el-form-item label="模板名称：">
                    <el-input placeholder="请输入模板名称" v-model="topSearch.freightName" style="width:160px;"></el-input>    
                </el-form-item>
                <el-form-item label="创建时间：" >
                   <el-date-picker
                    v-model="topSearch.choseDay"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                </el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" icon="el-icon-search" round >查询</el-button>
                </el-form-item>
            </el-form>
            <div class="temp-body">
                <div class="temp-title">
                    新增运费模板
                </div>
                <el-form >
                    <el-form-item label="模板名称：">
                        <el-input placeholder="请输入模板名称" style="width:300px"></el-input>
                    </el-form-item>
                    <div class="sub-form">
                    <el-form-item label="是否包邮：">
                        <el-radio-group v-model="isBaoyou">
                        <el-radio label="自定义运费"></el-radio>
                        <el-radio label="卖家包邮"></el-radio>                    
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="计价方式：">
                        <el-radio-group v-model="jijiaType">
                        <el-radio label="按件数"></el-radio>
                        <el-radio label="按重量"></el-radio>                    
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="运送方式：">
                          <el-checkbox-group 
                            v-model="checkedComputeType">
                            <el-checkbox v-for="cType in cTypes" :label="cType" :key="cType">{{cType}}</el-checkbox>
                         </el-checkbox-group>
                    </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="freight-extral">
                  <el-checkbox-group >
                     <el-checkbox >指定地区包邮</el-checkbox>
                  </el-checkbox-group>
            </div>
            <div class="bt-button">
                <el-button type="success" class="submit-120w36" round @click="goTemp">保存并返回</el-button>
                <el-button type="info" round @click="goTemp">取消</el-button>
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            topSearch: {
                freightName: "",                
                choseDay: null 
            },         
            checkedComputeType: ["快递"],
            cTypes:["快递", "EMS", "平邮"],
            isBaoyou:"自定义运费",
            jijiaType:"按重量",
            addTemp:false
        }
    },
    props:["addTemp"],
    methods: {
        goTemp() {
            this.addTemp = true
        }
    }
}
</script>
