<template>
  <div id="app">
    <agora-header></agora-header>
    <div id="status">
      <governance-status></governance-status>
      <wallet-status></wallet-status>
    </div>

    <div id="mainBody">
      <gov-menu v-bind:state="state" v-on:switch="switchList"></gov-menu>
      <ongoing-vote v-bind:state="state"></ongoing-vote>
    </div>
    <agora-footer></agora-footer>
  </div>
</template>

<script>
import AgoraHeader from "../components/AgoraHeader.vue";
import AgoraFooter from "../components/AgoraFooter.vue";
import WalletStatus from "../components/WalletStatus.vue";
import GovernanceStatus from "../components/governancePage/GovernanceStatus.vue";
import GovMenu from "../components/governancePage/GovMenu.vue";
import OngoingVote from "../components/governancePage/OngoingVote.vue";

export default {
  components: {
    OngoingVote,
    AgoraHeader,
    AgoraFooter,
    WalletStatus,
    GovernanceStatus,
    GovMenu,
  },
  methods: {
    switchList(str) {
      this.state = str;
    },
  },
  data() {
    return {
      state: "onGoing",
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background-color: #082e55;
  padding-top: 8rem;
}

#status {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 3.75rem;
  margin-bottom: 2rem;
}

#mainBody {
  padding: 0 8rem;
}
</style>
