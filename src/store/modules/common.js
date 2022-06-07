import krIcon from '@/assets/img/icon-kr.svg'
import enIcon from '@/assets/img/icon-en.svg'

const common = {
	namespaced: true,
	state: {
		countryCode: null,
		items: {},
	},
	mutations: {
		MUT_SET_COUNTRY_CODE(state) {
			state.countryCode = [
				{text: '한국어', value: 'kr', icon: krIcon},
				{text: 'English', value: 'en', icon: enIcon},
			]
		},
		MUT_SET_ITEMS(state, payload) {
			state.items = payload
		},
	},
	actions: {
		setCountryCode({commit}) {
			commit("MUT_SET_COUNTRY_CODE");
		},
		setItems({commit}, payload) {
			commit("MUT_SET_ITEMS", payload);
		},
		setDocTitle({commit}, payload) {
			document.title = `${payload} - 게임 전적 - League of Legends`
		},
	},
	getters: {
		getCountryCode: state => {
			return state.countryCode
		},
		getItems: state => {
			return state.items
		},
	},
}

export default common