import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import common from '@/store/modules/common.js'
import summoner from '@/store/modules/summoner.js'

const store = new Vuex.Store({
    modules: {
        common,
        summoner,
    }
})

export default store