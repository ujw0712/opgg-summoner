<template>
  <header>
    <div class="inner-layout">
      <div></div>

      <div class="search-box" v-click-outside="closeSearchHistoryPopup">
        <div v-click-outside="closeLangList">
          <button @click="openLangList" class="lang"><span>{{ getLangText }}</span></button>
          <ul v-if="isOpenLangList" class="lang-list">
            <li v-for="(item, index) in getCountryCode" :key="`lang${index}`" @click="setLang(item.value)">
              <img :src="item.icon"/> {{item.text}}
            </li>
          </ul>
        </div>
        <input type="text" v-model="name" :placeholder="$t(`search-placeholder`)" @focus="openSearchHistoryPopup" @keypress.enter="search">
        <button ref="searchBtn" class="search-btn" @click="search">.GG</button>

        <div v-if="isOpenSearchHistoryPopup && searchHistoryList.length > 0" class="search-history">
          <ul>
            <li v-for="(item, index) in searchHistoryList" :key="`search${index}`">
              <span @click="search2(item)">{{ item }}</span>
              <img src="@/assets/img/icon-close.png" @click="removeSearchHistory(item)">
            </li>
          </ul>
        </div>

      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        lang: this.$i18n.locale,
        isOpenLangList: false,
        autocompleteList: [],
        name: '버스타러왓습니다',
        isOpenSearchHistoryPopup: false,
        searchHistoryList: [],
      }
    },
    computed: {
      ...mapGetters({
        getCountryCode: 'common/getCountryCode',
      }),
      getLangText() {
        return this.lang === 'kr' ? '한국어' : 'English'
      },
    },
    created() {
      if (localStorage.getItem('locale')) {
        this.$i18n.locale = localStorage.getItem('locale')
        this.lang = localStorage.getItem('locale')
      }
      this.search()
      this.getItems()
    },
    methods: {
      ...mapActions({
        setDocTitle: 'common/setDocTitle',
        setSummoner: 'summoner/setSummoner',
        setSummonerMostInfo: 'summoner/setSummonerMostInfo',
        setMatches: 'summoner/setMatches',
        setItems: 'common/setItems',
      }),
      search() {
        if (!this.name) return false
        this.setDocTitle(this.name)
        this.getSummoner(this.name)
        this.getSummonerMostInfo(this.name)
        this.getSummonerMatches(this.name)

        const list = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : []
        if (!list.includes(this.name)) list.push(this.name)
        localStorage.setItem('searchHistory', JSON.stringify(list))
        this.searchHistoryList = list
        this.closeSearchHistoryPopup()

        this.name = null
        if (this.$refs.searchBtn) this.$refs.searchBtn.focus()
      },
      search2(name) {
        this.name = name
        this.search()
      },
      async getSummoner(name) {
        const { summoner } = await this.$api.getSummoner({name: name})
        this.setSummoner(summoner)
      },
      async getSummonerMostInfo(name) {
        const { champions, recentWinRate } = await this.$api.getSummonerMostInfo({name: name})
        this.setSummonerMostInfo({ champions, recentWinRate })
      },
      async getSummonerMatches(name) {
        const { champions, games, positions, summary } = await this.$api.getSummonerMatches({name: name})
        this.setMatches({ champions, games: await this.setGames(games), positions, summary })
      },
      async setGames(games) {
        const list = []
        for (let game of games) {
          const { teams } = await this.$api.getSummonerMatch({name: game.summonerName, gameId: game.gameId})
          game.teams = teams
          list.push(game)
        }
        return list
      },
      async getItems() {
        const { data } = await this.$api.getItems()
        this.setItems(data)
      },
      openLangList() {
        this.isOpenLangList = true
      },
      closeLangList() {
        this.isOpenLangList = false
      },
      openSearchHistoryPopup() {
        this.isOpenSearchHistoryPopup = true
      },
      closeSearchHistoryPopup() {
        this.isOpenSearchHistoryPopup = false
      },
      getSearchHistoryList() {
        if (!localStorage.getItem('searchHistory')) return []
        this.searchHistoryList = JSON.parse(localStorage.getItem('searchHistory'))
      },
      removeSearchHistory(item) {
        let list = JSON.parse(localStorage.getItem('searchHistory'))
        localStorage.setItem('searchHistory', JSON.stringify(list.filter(l => l !== item)))
        this.getSearchHistoryList()
      },
      setLang(lang) {
        this.lang = lang
        localStorage.setItem('locale', lang)
        this.$i18n.locale = lang
        this.closeLangList()
      },
    }
  }
</script>
