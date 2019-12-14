<template>
      <div class="logist">
        <div class="logist_head">物流跟踪</div>
        <div class="logist_list">
            <el-steps direction="vertical" :active="1">
                <el-step title="您的订单已签收" description="2018-06-15 06:23">
                    <svg-icon icon-class="step-cur" slot="icon"></svg-icon>
                </el-step>
                <el-step title="您的订单已进入商家仓库，准备出库" description="2018-06-15 06:23" status="wait"></el-step>
                <el-step title="您的订单已进入商家仓库，准备出库" description="2018-04-09  08:06" status="wait"></el-step>
                <el-step title="您的订单已进入商家仓库，准备出库" description="2018-04-09  08:06" status="wait"></el-step>
            </el-steps>
        </div>
    </div>
</template>
