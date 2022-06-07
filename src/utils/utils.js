export default {
  install(Vue) {
    Number.prototype.numberFormat = function() {
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    Vue.prototype.$getWinRatio = function(win, total) {
      return `${Math.round(win/(total)*100)}`
    }

    Vue.prototype.$getKda = function(kills, assists, deaths) {
      return `${((kills+assists)/deaths).toFixed(2)}`
    }

    Vue.prototype.$elapsedText = function(_date) {
      const locale = this.$i18n.locale
      const sText = locale === 'kr' ? '초 전' : 'seconds ago'
      const minText = locale === 'kr' ? '분 전' : 'minutes ago'
      const hText = locale === 'kr' ? '시간 전' : 'hours ago'
      const tText = locale === 'kr' ? '하루 전' : 'a day ago'
      const dText = locale === 'kr' ? '일 전' : 'days ago'
      const mText = locale === 'kr' ? '달 전' : 'months ago'

      const seconds = 1000
      const minute = seconds * 60
      const hour = minute * 60
      const day = hour * 24
      const month = day * 30
      const year = month * 12
      const elapsedTime = _date

      let elapsedText = ''
      if (elapsedTime < minute) {
        elapsedText = `${elapsedTime} ${sText}`
      } else if (elapsedTime < hour) {
        elapsedText = `${Math.trunc(elapsedTime / minute)} ${minText}`
      } else if (elapsedTime < day) {
        elapsedText = `${Math.trunc(elapsedTime / hour)} ${hText}`
      } else if (elapsedTime == (day)) {
        elapsedText = `${Math.trunc(elapsedTime / day)} ${tText}`
      } else if (elapsedTime < (month)) {
        elapsedText = `${Math.trunc(elapsedTime / day)} ${dText}`
      } else if (elapsedTime < year) {
        elapsedText = `${Math.trunc(elapsedTime / month)} ${mText}`
      }
      return elapsedText
    }

    Vue.prototype.$gameTime = function(seconds) {
      const locale = this.$i18n.locale
      const hourText = locale === 'kr' ? '시' : 'h'
      const minText = locale === 'kr' ? '분' : 'm'
      const secText = locale === 'kr' ? '초' : 's'

      const hour = parseInt(seconds/3600);
      const min = parseInt((seconds%3600)/60);
      const sec = seconds%60;

      let result = ''
      if (hour > 0) result = result.concat(`${hour}${hourText} `)
      if (min > 0) result = result.concat(`${min}${minText} `)
      if (sec > 0) result = result.concat(`${sec}${secText}`)

      return result
    }
  }
}