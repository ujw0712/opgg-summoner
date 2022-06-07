<template>
	<div :class="getColor(getKda)">
		<span v-if="onlyNumber">{{ getKda }} {{ $t(`kda`) }}</span>
		<template v-else-if="boldNumber">
			<span class="bold">{{ getKda }}</span>:1
		</template>
		<span v-else>{{ getKda }}:1 {{ $t(`kda`) }}</span>
	</div>
</template>

<script>
  export default {
		props: ['kills', 'assists', 'deaths', 'str', 'boldNumber', 'onlyNumber'],
		data() {
			return {
			}
		},
		computed: {
			getKda() {
				return this.$getKda(this.kills, this.assists, this.deaths)
			},
		},
		methods: {
			getColor(_kda) {
				const kda = this.str ? parseInt(this.str.replace(':1', '')) : parseInt(_kda)
				if (kda >= 5) return 'bluey-green'
				if (kda >= 4) return 'bluish'
				if (kda >= 3) return 'yellow-ochre'
				return ''
			}
		},
	}
</script>