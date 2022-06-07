<template>
	<div class="win-ratio">
		<div class="tab-menu">
			<div @click="setSelect(champion)" :class="{ 'active': select === champion }">{{ $t(`win-ratio.champion`) }}</div>
			<div @click="setSelect(recent)" :class="{ 'active': select === recent }">{{ $t(`win-ratio.recent`) }}</div>
		</div>

		<ul v-if="select === champion" class="champion">
			<li v-for="(item, index) in getChampions" :key="`champions${index}`">
				<img :src="item.imageUrl"/>
				<div class="name">
					<div class="bold">{{ $getChampionName(item.key) }}</div>
					<!-- () 안의 값이 분당 cs인 듯 한데 따로 데이터가 없어서 OPGG사이트에서 계산해보니 (소환사, 챔피언마다 다르지만) 27정도가 가장 유사함. -->
					<div>{{ $t(`cs`) }} {{ item.cs }} ({{ (item.cs/27).toFixed(1) }})</div>
				</div>
				<div class="kda">
					<kda :kills="item.kills" :assists="item.assists" :deaths="item.deaths" class="bold" />
					<div>{{ getRatio(item.kills, item.games) }} / {{ getRatio(item.kills, item.assists) }} / {{ getRatio(item.kills, item.deaths) }}</div>
				</div>
				<div class="games">
					<win-ratio :wins="item.wins" :games="item.games" class="bold"/>
					<div>{{ item.games }} {{ $t(`played`) }}</div>
				</div>
			</li>
		</ul>

		<ul v-if="select === recent" class="recent">
			<li v-for="(item, index) in getRecentWinRate" :key="`recent${index}`">
				<img :src="item.imageUrl"/>
				<div class="name">{{ $getChampionName(item.key) }}</div>
				<div class="odds">{{ $getWinRatio(item.wins, item.wins+item.losses) }}%</div>
				<bar-chart :wins="item.wins" :losses="item.losses"/>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Kda from '@/components/summoner/Kda'
	import WinRatio from "@/components/summoner/WinRatio"
	import BarChart from '@/components/summoner/BarChart'

	export default {
		components: { Kda, WinRatio, BarChart },
		data() {
			return {
				champion: 'champion',
				recent: 'recent',
				select: null,
			}
		},
		computed: {
			...mapGetters({
				getSummonerChampions: 'summoner/getSummonerChampions',
				getSummonerRecentWinRate: 'summoner/getSummonerRecentWinRate',
			}),
			getChampions() {
				return this.getSummonerChampions && this.getSummonerChampions.length > 0
					? this.getSummonerChampions.sort((a,b) => b.games - a.games) : []
			},
			getRecentWinRate() {
				return this.getSummonerRecentWinRate && this.getSummonerRecentWinRate.length > 0
					? this.getSummonerRecentWinRate.sort((a,b) => (b.wins+b.losses) - (a.wins+a.losses)) : []
			},
		},
		created() {
			this.setSelect(this.champion)
		},
		methods: {
			setSelect(v) {
				this.select = v
			},
			getTier(tier, shortString) {
				return `${tier} ${shortString.substr(-1)}`
			},
			getRatio(a, b) {
				return (a/b).toFixed(1)
			}
		},
	}
</script>