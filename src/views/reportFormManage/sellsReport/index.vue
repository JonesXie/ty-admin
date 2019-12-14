<template>
<div>
    <normal v-if="showType" @changeType="changeType"></normal>
    <!-- <years v-else @changeType="changeType"></years> -->
</div>
</template>
<script>
import normal from './normal'
import years from './years'
export default {
    name: 'sellsReport',
    components: {
        normal, years
    },
    data() {
        return {
            showType: 1
        }
    },
    methods: {
        changeType(val) {
            this.showType = val
        }
    }
}
</script>

