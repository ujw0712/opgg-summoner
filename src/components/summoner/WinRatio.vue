<template>
	<div :class="getColor(getWinRatio)">
		<span>{{ getWinRatio }}%</span>
	</div>
</template>

<script>
	export default {
		props: ['wins', 'games'],
		data() {
			return {
			}
		},
		computed: {
			getWinRatio() {
				return this.$getWinRatio(this.wins, this.games)
			},
		},
		methods: {
			getColor(_ratio) {
				const ratio = parseInt(_ratio)
				if (ratio >= 60) return 'reddish'
				return ''
			}
		},
	}
</script>