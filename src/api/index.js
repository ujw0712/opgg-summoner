import axios from 'axios'

const SUMMONER = 'summoner'

export default class api {

    instance = null
    getBaseUrl = null

    constructor() {
        this.getBaseUrl = 'https://codingtest.op.gg/api'

        this.instance = axios.create({
            baseURL: this.getBaseUrl,
            timeout: 60000,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded charset=UTF-8',
            },
        })
    }

    setInterceptors = (instance) => {
        instance.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );
        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                console.log("=========== ERROR ===========")
                console.log("> error : ", error)
                console.log("> error.response : ", error.response)
                console.log("=========== // ERROR ===========")
                return Promise.reject(error);
            },
        );
        return instance;
    }

    api = () => this.setInterceptors(this.instance)

    getAPI = (url, payload) => this.api().get(url, { params: payload }).then((res) => res.data)
    getItemsAPI = () => axios.get('http://ddragon.leagueoflegends.com/cdn/10.15.1/data/ko_KR/item.json').then((res) => res.data)


    /* 소환사 기본 정보 API */
    getSummoner = (payload) => this.getAPI(`${SUMMONER}/${payload.name}`)

    /* 소환사 most info API */
    getSummonerMostInfo = (payload) => this.getAPI(`${SUMMONER}/${payload.name}/mostInfo`)

    /* 소환사 match list API */
    getSummonerMatches = (payload) => this.getAPI(`${SUMMONER}/${payload.name}/matches`)

    /* 소환사 match 상세정보 API */
    getSummonerMatch = (payload) => this.getAPI(`${SUMMONER}/${payload.name}/matchDetail/${payload.gameId}`)

    /* 아이템 정보 API*/
    getItems = () => this.getItemsAPI()
}