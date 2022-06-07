<template>
  <ul class="game-container">
    <li v-for="item in list" :class="['game-item', { 'wins': item.isWin }, { 'losses': !item.isWin }]">
      <div class="info">
        <div class="type">{{ $t(`${item.gameType}`) }}</div>
        <div>{{ $elapsedText(item.createDate) }}</div>
        <div class="separator-v"></div>
        <div class="result">{{ item.isWin ? $t(`victory`) : $t(`defeat`) }}</div>
        <div>{{ $gameTime(item.gameLength) }}</div>
      </div>
      <div>
        <div class="champion">
          <div class="champion-image">
            <img :src="item.champion.imageUrl"/>
          </div>
          <div class="spells">
            <img v-for="s in item.spells" :src="s.imageUrl" class="spell"/>
          </div>
          <div class="runes">
            <img v-for="p in item.peak" :src="p" class="rune"/>
          </div>
        </div>
        <div>{{ getChampionName(item.champion.imageUrl) }}</div>
      </div>
      <div class="kda">
        <div class="kda-info">
          <span>{{ item.stats.general.kill }}</span>
          <span class="death">{{ item.stats.general.death }}</span>
          <span>{{ item.stats.general.assist }}</span>
        </div>
        <div class="kda-ratio"><span>{{ item.stats.general.kdaString }}</span> {{ $t(`kda`) }}</div>
        <div class="kda-badge">
          <span v-if="item.stats.general.largestMultiKillString" class="multi-kill">{{ item.stats.general.largestMultiKillString }}</span>
          <span v-if="item.stats.general.opScoreBadge" class="score-badge">{{ item.stats.general.opScoreBadge }}</span>
        </div>
      </div>
      <div class="stats">
        <div class="level">{{ $t(`level`) }} {{ item.champion.level }}</div>
        <div class="cs">{{ item.stats.general.cs }} ({{ item.stats.general.csPerMin }}) CS</div>
        <div class="kill-ratio">{{ $t(`p/kill`) }} {{ item.stats.general.contributionForKillRate }}</div>
      </div>
      <div>
        <div class="items">
          <div class="item">
            <item v-for="(i, index) in item.items" v-if="index < item.items.length-1" :item="i" :key="`item${index}`" />
            <span v-for="n in 7-(item.items.length)" class="no-item"></span>
          </div>
          <div class="ward">
            <item :item="item.items[item.items.length-1]" />
            <img v-if="item.isWin" src="@/assets/img/icon-item-blue.png" />
            <img v-else src="@/assets/img/icon-item-red.png" />
          </div>
        </div>
        <div class="ward-count">
          <img v-if="item.isWin" src="@/assets/img/icon-ward-blue.svg" />
          <img v-else src="@/assets/img/icon-ward-red.svg" />
          {{ $t(`control-ward`) }} {{getSumWard(item.stats.ward)}}
        </div>
      </div>


      <div class="player">
        <ul v-for="(team, index) in item.teams" :key="`teams${index}`">
          <li v-for="(player, index2) in team.players" :key="`player-${team.teamId}-${index2}`">
            <img :src="player.champion.imageUrl" width="16" height="16" />
            <span>{{player.summonerName}}</span>
          </li>
        </ul>
      </div>

      <div class="more">
        <button class="detail">
          <img v-if="item.isWin" src="@/assets/img/icon-more-blue.png" />
          <img v-else src="@/assets/img/icon-more-red.png" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
	import Kda from '@/components/summoner/Kda'
  import Item from "@/components/summoner/Item"

	export default {
		props: ['list'],
		components: { Kda, Item },
		data() {
			return {
			}
		},
		methods: {
      getChampionName(imgName) {
        const paths = imgName.split('/')
        const key =  paths[paths.length-1].split('.')[0]
        return this.$getChampionName(key)
      },
			getSumWard(ward) {
				let sum = 0
				for (let w of Object.values(ward)) {
					sum += w
				}
				return sum
			},
		},
	}
</script>