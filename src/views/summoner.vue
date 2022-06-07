<template>
  <div>
    <profile />

    <div class="line" />

    <div class="inner-layout">
      <div class="history-wrapper">

        <div class="left-wrapper">
          <leagues />
          <wins-ratio />
        </div>

        <div class="right-wrapper">
          <summaries />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Profile from '@/components/summoner/Profile'
  import Leagues from '@/components/summoner/Leagues'
  import WinsRatio from '@/components/summoner/WinsRatio'
  import summaries from '@/components/summoner/Summary'

  export default {
    components: { Profile, Leagues, WinsRatio, summaries },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
