<template>
	<div class="tooltip" :style="getTooltipStyle()">
		<div class="item-name">{{ data.name }}</div>
		<div>{{ data.plaintext }}</div>
		<div v-html="data.description"></div>
		<br/>
		<div v-if="data.gold.total > 0">가격: <span class="item-price"> {{ data.gold.total }} ({{ data.gold.sell }})</span></div>
		<span class="tooltip-tail" />
	</div>
</template>

<script>
	export default {
		props: ['data'],
		methods: {
			getTooltipStyle() {
				let tail = document.querySelector('.tooltip-tail');
				let mainElem = this.$el;
				if (tail && mainElem) {
					let rect;
					return {
						display: 'none'
					}

					tail.style.top = mainElem.offsetHeight + 'px';
					return {
						left: `${rect.left + (rect.width / 2)}px`,
						top: `${window.scrollY + rect.top - (mainElem.offsetHeight + 10)}px`
					};
				}
				else {
					return {
						display: 'none'
					}
				}
			}
		}
	}
</script>