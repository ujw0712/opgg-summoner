<template>
	<div>
		<div class="summary-container">
			<ul class="tab-menu2">
				<li v-for="(item, index) in getTabOptions" :key="`rank-tab${index}`" :class="{ 'active': tab === item }" @click="setTab(item)" >{{ $t(`${item}`) }}</li>
			</ul>

			<div class="summary-contents">
				<div class="summary">
					<div>
						<div class="text">{{ getMatchTotal }}{{ $t(`game`) }} {{ getMatches.summary.wins }}{{ $t(`win`) }} {{ getMatches.summary.losses }}{{ $t(`lose`) }}</div>
						<div class="donut-chart">
							<div class="wrapper"><!-- d3 그래프 --></div>
							<div class="graph-percentage">
								<p>{{ $getWinRatio(getMatches.summary.wins, getMatchTotal) }} %</p>
							</div>
						</div>
					</div>
					<div class="info">
						<div class="kda">
							<span>{{ getMatches.summary.kills }}</span>
							<span class="wins">{{ getMatches.summary.assists }}</span>
							<span>{{ getMatches.summary.deaths }}</span>
						</div>
						<div class="ratio">
							<kda :kills="getMatches.summary.kills" :assists="getMatches.summary.assists" :deaths="getMatches.summary.deaths" boldNumber="true" class="kda-ratio" />
							<span class="win-ratio"> ({{ $getWinRatio(getMatches.summary.wins, getMatchTotal) }}%)</span>
						</div>
					</div>
				</div>

				<ul class="champions">
					<li v-for="item in getMatches.champions">
						<img :src="item.imageUrl" />
						<div>
							<div class="name">{{ $getChampionName(item.key) }}</div>
							<div class="info">
								<span class="ratio"><strong>{{ $getWinRatio(item.wins, item.wins+item.losses) }}</strong>%</span>
								({{ item.wins }}{{ $t(`win`) }} {{ item.losses }}{{ $t(`lose`) }})
								<span class="kda"><kda :kills="item.kills" :assists="item.assists" :deaths="item.deaths" onlyNumber="true"/></span>
							</div>
						</div>
					</li>
					<div v-for="item in 3-getMatches.champions.length" class="no-champions">
						<img src="@/assets/img/no-champion.svg"/>
						<div>{{ $t(`no-champion`) }}</div>
					</div>
				</ul>
				<div class="positions">
					<div>{{ $t(`preferred-position`) }}</div>
					<ul>
						<li v-for="(item, index) in getMatches.positions" :key="`positions${index}`">
							<img :src="require(`@/assets/img/position-${item.position.toLowerCase()}.svg`)">
							<div>
								<div class="name">{{ getPositionName(item.position) }}</div>
								<div class="info">
									<span class="role-ratio"><strong>??</strong>%</span>
									<span class="wins-ratio">{{ $t(`win-ratio`) }} <strong>{{ $getWinRatio(item.wins, item.games) }}</strong>%</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<game :list="getGameList" />
	</div>
</template>

<script>
	import * as d3 from '@/plugins/d3.v5.min.js'
	import { mapGetters } from 'vuex'
	import Game from '@/components/summoner/Game'
	import Kda from '@/components/summoner/Kda'

	export default {
		components: { Game, Kda },
		data() {
			return {
				tab: '전체',
			}
		},
		watch: {
			getMatches() {
				this.initDonutChart()
			},
		},
		computed: {
			...mapGetters({
				getMatches: 'summoner/getMatches',
			}),
			getMatchTotal() {
				return this.getMatches.summary.wins + this.getMatches.summary.losses
			},
			getTabOptions() {
				const games = this.getMatches.games.map(g => g.gameType)
				const list = [...new Set(games)].sort()
				list.unshift('전체')
				return list
			},
			getGameList() {
				const gameList = this.getMatches.games.sort((a, b) => a.createDate - b.createDate)
				if (this.tab === '전체') return gameList
				return gameList.filter(f => f.gameType  === this.tab)
			},
		},
		methods: {
			initDonutChart() {
				let dataSet = [this.getMatches.summary.losses, this.getMatches.summary.wins]
				let graphWrapper = document.querySelector('.donut-chart .wrapper')
				graphWrapper.innerHTML = '<svg id="graph-pie" class="graph" style="width: 90px; height: 90px;"></svg>'
				let pie = d3.pie()
				let arc = d3.arc().innerRadius(32).outerRadius(45)
				let pieElements = d3.select('#graph-pie')
					.selectAll('g')
					.data(pie(dataSet))
					.enter()
					.append('g')
					.attr('transform', 'translate(45, 45)')

				pieElements
					.append('path')
					.attr('class', 'pie')
					.attr('data-index', function (d, i) {
						return i
					})
					.transition()
					.duration(200)
					.delay(function (d, i) {
						return i * 200
					})
					.attrTween('d', function (d, i) {
						const interpolate = d3.interpolate(
							{startAngle: d.startAngle, endAngle: d.startAngle},
							{startAngle: d.startAngle, endAngle: d.endAngle}
						);
						return function (t) {
							return arc(interpolate(t))
						};
					});
			},
			getPositionName(position) {
				let name = ''
				switch (position) {
					case 'ADC':
						name = this.$t(`position.adc`)
						break;
					case 'JNG':
						name = this.$t(`position.jng`)
						break;
					case 'MID':
						name = this.$t(`position.mid`)
						break;
					case 'SUP':
						name = this.$t(`position.sup`)
						break;
					case 'TOP':
						name = this.$t(`position.top`)
						break;
					default:
						name = ''
				}
				return name
			},
			setTab(item) {
				this.tab = item
			}
		},
	}
</script>