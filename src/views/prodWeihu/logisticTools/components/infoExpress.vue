<template>
<div>
    <el-form :inline="true" class="mtb30">
        <el-form-item label="物流单号：">
            <el-input placeholder="请输入物流单号" style="width:280px;"></el-input>    
        </el-form-item>
        <el-form-item >
            <el-button type="primary" icon="el-icon-search" round >查询</el-button>
        </el-form-item>
    </el-form>
    <div class="logist-result">
        <no-logist-info></no-logist-info>
        <div class="logistic-w"><logist-info></logist-info></div>
    </div>
</div>
</template>
<script>
import logistInfo from '@/components/logisticFollow/logisticInfo.vue'
export default {
    
}
</script>

