const summoner = {
    namespaced: true,
    state: {
        summoner: {
            ladderRank: {
                rank: 0,
                rankPercentOfTop: 0
            },
            leagues: [],
            level: 0,
            name: null,
            previousTiers: [],
            profileBackgroundImageUrl: null,
            profileBorderImageUrl: null,
            profileImageUrl: null,
            url: null,
        },
        summonerChampions: [],
        summonerRecentWinRate: [],
        matches: {
            champions: [],
            games: [],
            positions: [],
            summary: {},
        }
    },
    mutations: {
        MUT_SET_SUMMONER(state, payload) {
            state.summoner = {
                ladderRank: payload.ladderRank,
                leagues: payload.leagues,
                level: payload.level,
                name: payload.name,
                previousTiers: payload.previousTiers,
                profileBackgroundImageUrl: payload.profileBackgroundImageUrl,
                profileBorderImageUrl: payload.profileBorderImageUrl,
                profileImageUrl: payload.profileImageUrl,
                url: payload.url,
            }
        },
        MUT_SET_SUMMONER_MOST_INFO(state, payload) {
            state.summonerChampions = payload.champions
            state.summonerRecentWinRate = payload.recentWinRate
        },
        MUT_SET_MATCHES(state, payload) {
            state.matches = {
                champions: payload.champions,
                games: payload.games,
                positions: payload.positions,
                summary: payload.summary,
            }
        },
    },
    actions: {
        setSummoner({commit}, payload) {
            commit("MUT_SET_SUMMONER", payload)
        },
        setSummonerMostInfo({commit}, payload) {
            commit("MUT_SET_SUMMONER_MOST_INFO", payload)
        },
        setMatches({commit}, payload) {
            commit("MUT_SET_MATCHES", payload)
        },
    }
    ,
    getters: {
        getSummoner: state => {
            return state.summoner
        },
        getSummonerLeagues: state => {
            return state.summoner.leagues
        },
        getSummonerChampions: state => {
            return state.summonerChampions
        },
        getSummonerRecentWinRate: state => {
            return state.summonerRecentWinRate
        },
        getMatches: state => {
            return state.matches
        },
    },
}

export default summoner