import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import en from './locale/en.json'
import kr from './locale/kr.json'

const messages = {
	en, kr
}

const i18n = new VueI18n({
	locale: 'kr',
	messages
})
export default i18n