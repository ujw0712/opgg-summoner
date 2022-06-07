<template>
  <div id="app">
    <global-header/>

    <div class="layout-container">
      <router-view />
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import globalHeader from './components/common/header'
  import './assets/scss/_index.scss'

  export default {
    components: { globalHeader },
    data() {
      return {
      }
    },
    created() {
      this.setCountryCode()
    },
    methods: {
      ...mapActions({
        setCountryCode: 'common/setCountryCode',
      }),
    }
  }
</script>