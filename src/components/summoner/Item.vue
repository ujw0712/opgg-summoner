<template>
  <div class="item-wrapper">
    <img :src="item.imageUrl" @mouseover.stop="openTooltip" @mouseleave.stop="closeTooltip">
    <tooltip v-show="isOpenTooltip" :data="getItemInfo" v-click-outside="closeTooltip"/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import Tooltip from "@/components/common/Tooltip"

	export default {
		props: ['item'],
		components: {Tooltip},
		data() {
			return {
        isOpenTooltip: false
			}
		},
		computed: {
      ...mapGetters({
        getItems: 'common/getItems',
      }),
      getItemInfo() {
        const itemPath = this.item.imageUrl.split('/')
        const itemId = itemPath[itemPath.length-1].split('.')[0]
        return this.getItems[itemId]
      },
		},
		methods: {
      openTooltip() {
        this.isOpenTooltip = true
      },
      closeTooltip() {
        this.isOpenTooltip = false
      },
		},
	}
</script>