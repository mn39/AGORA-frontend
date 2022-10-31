<template>
  <div id="app">
    <agora-header></agora-header>
    <router-view></router-view>
    {{ tokenBalance }}
    <div id="status">
      <governance-status></governance-status>
      <wallet-status></wallet-status>
    </div>

    <div id="mainBody">
      <main-menu></main-menu>
      <ongoing-vote></ongoing-vote>
    </div>
    <agora-footer></agora-footer>
  </div>
</template>

<script>
import AgoraHeader from "../components/AgoraHeader.vue";
import AgoraFooter from "../components/AgoraFooter.vue";
import WalletStatus from "../components/WalletStatus.vue";
import GovernanceStatus from "../components/governancePage/GovernanceStatus.vue";
import MainMenu from "../components/governancePage/GovMenu.vue";
import OngoingVote from "../components/governancePage/OngoingVote.vue";

export default {
  components: {
    OngoingVote,
    AgoraHeader,
    AgoraFooter,
    WalletStatus,
    GovernanceStatus,
    MainMenu,
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
  margin-top: 60px;
  background-color: #082e55;
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
