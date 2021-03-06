export default {
  install(Vue) {

    const NAME = {
      Garen: '가렌',
      Galio: '갈리오',
      Gangplank: '갱플랭크',
      Gragas: '그라가스',
      Graves: '그레이브즈',
      Nami: '나미',
      Nasus: '나서스',
      Nautilus: '노틸러스',
      Nocturne: '녹턴',
      Nunu: '누누',
      Nidalee: '니달리',
      Darius: '다리우스',
      Diana: '다이애나',
      Draven: '드레이븐',
      Ryze: '라이즈',
      Rammus: '람머스',
      Lux: '럭스',
      Rumble: '럼블',
      Renekton: '레넥톤',
      Leona: '레오나',
      Rengar: '렝가',
      Lucian: '루시안',
      Lulu: '룰루',
      LeBlanc: '르블랑',
      "Lee Sin": '리 신',
      Riven: '리븐',
      Lissandra: '리산드라',
      "Master Yi": '마스터 이',
      Maokai: '마오카이',
      Malzahar: '말자하',
      Malphite: '말파이트',
      Mordekaiser: '모데카이저',
      Morgana: '모르가나',
      "Dr.Mundo": '문도박사',
      "Miss Fortune": '미스 포츈',
      Varus: '바루스',
      Vi: '바이',
      Veigar: '베이가',
      Vayne: '베인',
      Volibear: '볼리베어',
      Brand: '브랜드',
      Vladimir: '블라디미르',
      Blitzcrank: '블리츠크랭크',
      Viktor: '빅토르',
      Poppy: '뽀삐',
      Sion: '사이온',
      Shaco: '샤코',
      Sejuani: '세주아니',
      Sona: '소나',
      Soraka: '소라카',
      Shen: '쉔',
      Shyvana: '쉬바나',
      Swain: '스웨인',
      Skarner: '스카너',
      Sivir: '시비르',
      "Xin'Zhao": '신 짜오',
      Syndra: '신드라',
      Singed: '신지드',
      Thresh: '쓰레쉬',
      Ahri: '아리',
      Amumu: '아무무',
      Akali: '아칼리',
      Aatrox: '아트록스',
      Alistar: '알리스타',
      Annie: '애니',
      Anivia: '애니비아',
      Ashe: '애쉬',
      Elise: '엘리스',
      Wukong: '오공',
      Orianna: '오리아나',
      Olaf: '올라프',
      Yorick: '요릭',
      Udyr: '우디르',
      Urgot: '우르곳',
      Warwick: '워윅',
      Irelia: '이렐리아',
      Evelynn: '이블린',
      Ezreal: '이즈리얼',
      "Jarvan IV": '자르반 4세',
      Zyra: '자이라',
      Zac: '자크',
      Janna: '잔나',
      Jax: '잭스',
      Zed: '제드',
      Xerath: '제라스',
      Jayce: '제이스',
      Ziggs: '직스',
      Zilean: '질리언',
      Jinx: '징크스',
      "Cho'Gath": '초가스',
      Karma: '카르마',
      Kassadin: '카사딘',
      Karthus: '카서스',
      Cassiopeia: '카시오페아',
      "Kha'Zix": '카직스',
      Katarina: '카타리나',
      Kennen: '케넨',
      Caitlyn: '케이틀린',
      Kayle: '케일',
      "Kog'Maw": '코그모',
      Corki: '코르키',
      Quinn: '퀸',
      Taric: '타릭',
      Talon: '탈론',
      Trundle: '트런들',
      Tristana: '트리스타나',
      Tryndamere: '트린다미어',
      "Twisted Fate": '트위스티드 페이트',
      Twitch: '트위치',
      Teemo: '티모',
      Pantheon: '판테온',
      Fiddlesticks: '피들스틱',
      Fiora: '피오라',
      Fizz: '피즈',
      Heimerdinger: '하이머딩거',
      Hecarim: '헤카림',
      Qiyana: '키아나'
    }

    Vue.prototype.$getChampionName = function(key) {
      const locale = this.$i18n.locale
      return locale === 'kr' && NAME[key] ? NAME[key] : key
    }
  }
}