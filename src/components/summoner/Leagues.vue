<template>
	<div>
		<div v-for="(item, index) in getSummonerLeagues" class="leagues" :key="`leagues${index}`">
			<template v-if="item.hasResults">
				<div class="rank-icon">
					<img :src="item.tierRank.imageUrl" />
				</div>
				<div class="league-info">
					<div class="name">{{ $t(`${item.tierRank.name}`) }}</div>
					<div class="tier">{{ getTier(item) }}</div>
					<div><span class="lp">{{ item.tierRank.lp }}{{ $t(`lp`) }}</span> / {{ item.wins }}{{ $t(`win`) }} {{ item.losses }}{{ $t(`lose`) }}</div>
					<div class="ratio">{{ $t(`win-ratio`) }} {{ $getWinRatio(item.wins, item.wins+item.losses) }}%</div>
				</div>
			</template>
			<template v-else>
				<div class="leagues no-data">
					<div class="rank-icon">
						<img src="@/assets/img/no-ranked.png" width="64" height="64" />
					</div>
					<div class="league-info">
						<div class="name">[랭크 종류]</div>
						<div>Unranked</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapGetters({
				getSummonerLeagues: 'summoner/getSummonerLeagues',
			}),
		},
		methods: {
			getTier(item) {
				return `${item.tierRank.tier} ${item.tierRank.shortString.substr(-1)}`
			}
		},
	}
</script>