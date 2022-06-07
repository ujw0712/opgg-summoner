<template>
	<div class="bar-chart">
		<div class="bars">
			<div v-if="wins > 0" :style="getBarItemCss(wins)" class="bar-item wins"><span>{{ wins }}{{ $t(`win`) }}</span></div>
			<div v-if="losses > 0" :style="getBarItemCss(losses)" class="bar-item losses"><span>{{ losses }}{{ $t(`lose`) }}</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['wins', 'losses'],
		data() {
			return {
			}
		},
		methods: {
			getBarItemCss(count, all) {
				if (all) {
					return {
						flex: count,
						borderRadius: 10+'px'
					}
				}
				return {
					flex: count
				}
			},
		},
	}
</script>