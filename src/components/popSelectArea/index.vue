<template>
    <div class="app-dialog">
        <el-dialog title="选择区域" :visible.sync="popShow" width="540px" center @close="closePop()">
            <div class="dialog-body area-con">
                <el-checkbox-group v-model="checkedCities">
                    <el-checkbox v-for="prov in options" :label="prov.value.code" :key="prov.label">{{prov.label}}</el-checkbox>
                </el-checkbox-group>  
            </div>
            <div class="tc">
                <el-button type="primary" class="submit-102w36" round @click="returnData">确定</el-button>
            </div>    
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { regionProvinces } from '@/api/address'
export default {
  props: {
    pop: {
      type: Object,
      default: () => { return {} }
    }
  },
  watch: {
    pop: {
      handler(value) {
        this.popShow = value.show
        if (!value.show) return
        if (!this.addrOptions) this.getProv()
        else this.options = this.addrOptions
        if (value.data.initData) {
          this.initData = value.data.initData.split(',')
          const ary = []
          this.initData.forEach(ele => {
            ary.push(parseInt(ele))
          })
          this.checkedCities = ary
        } else {
          this.initData = []
          this.checkedCities = []
        }
      },
      deep: true
    }
  },
  data() {
    return {
      popShow: false,
      checkedCities: [],
      options: '',
      initData: []
    }
  },
  computed: {
    ...mapGetters([
      'addrOptions'
    ])
  },
  methods: {
    toInitData(item) {

    },
    returnData() {
      const opt = {
        region: [],
        nation: []
      }
      this.checkedCities.forEach(code => {
        this.options.forEach(ele => {
          if (code === ele.value.code) {
            opt.region.push(ele.value.code)
            opt.nation.push(ele.value.name)
          }
        })
      })
      this.$emit('returnData', {
        type: this.pop.data.type,
        region: opt.region.join(','),
        nation: opt.nation.join(',')
      })
      this.checkedCities = []
      this.closePop()
    },
    addData(data, type) {
      const opt = []
      data.forEach((ele, inx) => {
        const child = {
          label: ele.name,
          value: {
            inx: inx,
            code: ele.code,
            name: ele.name
          }
        }
        if (!type) child.children = []
        opt.push(child)
      })
      return opt
    },
    getProv() {
      regionProvinces().then((res) => {
        const data = res.data
        this.options = this.addData(data)
        this.$store.dispatch('AddrOptionsUp', this.options)
      })
    },
    closePop() {
      this.$emit('closePop')
    }
  }
}
</script>

<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.area-con{    
   padding: 5px;
    padding-bottom: 20px;    
}

</style>
<style lang="scss">
 .app-dialog .area-con{
     .el-checkbox{
         width: 33.33%;
         margin-bottom:10px;
         white-space: nowrap;
         &+.el-checkbox{
             margin:0;
         }
     }
 }
</style>
