<template>
    <el-cascader :placeholder="regPla" :options="options" class="selectAreaForm"
        @active-item-change="handleItemChange"
        v-model="addrRegion" @change="setReg"
    ></el-cascader>
</template>
<script>
import { mapGetters } from 'vuex'
import { regionProvinces, regionCities, regionAreas, fullname } from '@/api/address'
export default {
  props: {
    initRegion: {
      default: ''
    },
    clear: {
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'addrOptions'
    ])
  },
  watch: {
    clear: {
      handler(value) {
        if (!value) this.addrRegion = []
      },
      deep: true
    }
  },
  data() {
    return {
      options: [],
      addrRegion: [],
      regPla: '请选择省市区/县',
      region: ''
    }
  },
  mounted() {
    if (!this.addrOptions) this.getProv()
    else this.options = this.addrOptions
    if (this.initRegion) this.getFull(this.initRegion)
  },
  methods: {
    setReg(val) {
      this.region = val[val.length - 1].code
      this.$emit('returnRegion', this.region)
    },
    // 地区选择
    handleItemChange(val) {
      const length = val.length - 1
      if (length === 0) this.getCity(val)
      if (length === 1) this.getArea(val)
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
    getFull(code) {
      fullname(code).then((res) => {
        this.regPla = res.data
      })
    },
    getProv() {
      regionProvinces().then((res) => {
        const data = res.data
        this.options = this.addData(data)
        this.$store.dispatch('AddrOptionsUp', this.options)
      })
    },
    getCity(val) {
      val = val[0]
      if (this.options[val.inx].children.length > 0) return
      regionCities(val.code).then((res) => {
        const data = res.data
        this.options[val.inx].children = this.addData(data)
        this.$store.dispatch('AddrOptionsUp', this.options)
      })
    },
    getArea(val) {
      if (this.options[val[0].inx].children[val[1].inx].children.length > 0) return
      regionAreas(val[1].code).then((res) => {
        const data = res.data
        this.options[val[0].inx].children[val[1].inx].children = this.addData(data, 1)
        this.$store.dispatch('AddrOptionsUp', this.options)
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


