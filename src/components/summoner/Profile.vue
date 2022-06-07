<template>
	<div class="inner-layout">
		<div class="profile-wrapper">
			<div v-for="(item, index) in getSummoner.previousTiers" :key="`previous-tiers${index}`" class="tag">
				<span class="bold">S{{item.season}}</span> {{item.tier}}
			</div>

			<div class="profile">
				<div class="profile-image">
					<img :src="getSummoner.profileImageUrl" class="image"/>
					<img :src="getSummoner.profileBorderImageUrl" class="border" />
					<div class="level">
						{{ getSummoner.level }}
					</div>
				</div>

				<div>
					<div class="name">{{ getSummoner.name }}</div>
					<div class="rank">{{ $t(`ladder-rank`) }} <strong>{{ getSummoner.ladderRank.rank.numberFormat() }}</strong>위 ({{ $t(`top-of`, {rank: getSummoner.ladderRank.rankPercentOfTop}) }})</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from "vuex"
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapGetters({
				getSummoner: 'summoner/getSummoner',
			}),
		},
	}
</script>