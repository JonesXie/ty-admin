<template>
<el-form :inline="true" :model="topSearch" class="topMod">
    <div class=" clearfix">
        <template v-for="(item, key, index) in options">
            <el-form-item :key="'topSearchItem' + index" :label="item.title">
                <!-- 下拉 -->
                <template v-if="item.type==='select' && item.data !== ''">
                    <el-select v-model="topSearch[key]" :placeholder="item.placeholder" class="searchDay" @change="returnChange">
                        <el-option
                            v-for="opt in item.data"
                            :key="'select'+ index + opt.value ? opt.value : opt"
                            :label="typeof(opt) == 'object' ? opt.label : opt"
                            :value="typeof(opt) == 'object' ? opt.value : opt">
                        </el-option>
                    </el-select>
                </template>
                <!-- 地区选择 -->
                <template v-else-if="item.type==='selectArea'">
                    <formSelectArea @returnRegion="returnRegion(key,$event)" :initRegion="item.data?item.data:''" :clear="topSearch[key]" :changeSelect="true"></formSelectArea>
                </template>
                <!-- 产品类选择 -->
                <template v-else-if="item.type==='selectProClass'">
                    <formSelectProClass @returnData="returnRegion(key,$event)" :initData="item.data?item.data:''" :clear="topSearch[key]" ></formSelectProClass>
                </template>
                <!-- 双时间 -->
                <template v-else-if="item.type==='date' && item.Rename">
                    <el-date-picker
                        @change="returnChange"
                        v-model="topSearch[key].data"
                        :type="item.dateType ? item.dateType : 'daterange'"
                        :value-format="item.format ? item.format : 'yyyy-MM-dd'"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width:280px;">
                    </el-date-picker>
                </template>
                <!-- 单时间 -->
                <template v-else-if="item.type==='date' && !item.Rename">
                    <el-date-picker
                        @change="returnChange"
                        v-model="topSearch[key]"
                        :type="item.dateType ? item.dateType : 'date'"
                        :value-format="item.format ? item.format : 'yyyy-MM-dd'"
                        placeholder="选择日期"
                        style="width:180px;">
                    </el-date-picker>
                </template>
                <!-- 文本 -->
                <template v-else>
                    <el-input @change="returnChange"
                    v-model="topSearch[key]" @keyup.enter.native="returnSearch"
                    :placeholder="item.placeholder"></el-input>
                </template>
            </el-form-item>
        </template>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" round @click="returnSearch" v-if="toSec" >查询</el-button>
            <el-button type="success"  round @click="clearSearch" v-if="toClear">
                <i><svg-icon icon-class="icon-clean"></svg-icon></i>
                <span>清空</span>
            </el-button>
        </el-form-item>
        <el-form-item class="fr" v-if="useExport">
            <el-button type="success"  round plain @click="Export">
            <i><svg-icon icon-class="icon-export"></svg-icon></i>
            <span>导出</span>
            </el-button>
        </el-form-item>
    </div>
</el-form>
</template>
<script>
import formSelectArea from '@/components/formSelectArea/index'
import formSelectProClass from '@/components/formSelectProClass/index'
export default {
  components: {
    formSelectArea, formSelectProClass
  },
  props: {
    searchData: {
      type: Object
    },
    toSec: {
      type: Boolean,
      default: true
    },
    toClear: {
      type: Boolean,
      default: true
    },
    useExport: {
      default: ''
    },
    useExportData: {
      defalut: () => { return {} }
    }
  },
  data() {
    return {
      test: '',
      topSearch: {},
      options: {}
    }
  },
  created() {
    this.toCreated()
  },
  watch: {
    searchData: {
      handler(val) {
        this.options = Object.assign({}, val)
        this.toCreated()
      },
      deep: true
    }
  },
  methods: {
    toCreated() {
      // 起始数据绑定
      this.topSearch = {}
      this.options = Object.assign({}, this.searchData)
      for (const name in this.searchData) {
        this.topSearch[name] = this.searchData[name].defalut !== undefined ? this.searchData[name].defalut : ''
        this.searchData[name].value ? this.topSearch[name] = this.searchData[name].value : ''
        if (this.searchData[name].type === 'date') {
          this.topSearch[name] = ''
          if (!this.searchData[name].Rename) continue
          this.topSearch[name] = {}
          this.topSearch[name].data = null
          this.topSearch[name].startName = this.searchData[name].Rename[0]
          this.topSearch[name].endName = this.searchData[name].Rename[1]
        }
      }
      this.topSearch = Object.assign({}, this.topSearch)
    },
    returnSearch() {
      const opt = this.forIn()
      this.$emit('toSearch', opt)
    },
    returnChange() {
      const opt = this.forIn()
      this.$emit('change', opt)
    },
    clearSearch() {
      const opt = this.forIn('clear')
      this.$emit('change', opt)
    },
    forIn(clear) {
      const opt = {}
      for (const key in this.topSearch) {
        if (typeof (this.topSearch[key]) === 'object') {
          clear ? this.topSearch[key].data = null : (() => {
            if (!this.topSearch[key].data) return
            const startName = this.topSearch[key].startName
            const endName = this.topSearch[key].endName
            opt[startName] = this.topSearch[key].data[0]
            opt[endName] = this.topSearch[key].data[1] + ' 23:59:59'
          })()
        } else {
          const defalut = this.searchData[key].defalut !== undefined ? this.searchData[key].defalut : ''
          clear ? opt[key] = this.topSearch[key] = defalut : opt[key] = this.topSearch[key]
        }
      }
      return opt
    },
    returnRegion(key, val) {
      this.topSearch[key] = val
      this.returnChange()
    },
    Export() {
      this.$confirm('确认导出？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        let query = ''
        for (const key in this.useExportData) {
          if (this.useExportData[key] !== '') {
            query += query ? `&${key}=${this.useExportData[key]}` : `?${key}=${this.useExportData[key]}`
          }
        }
        window.location.href = this.useExport + query
      }).catch(() => {
      })
    }
  }
}
</script>

