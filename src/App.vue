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
import AgoraHeader from "./components/AgoraHeader.vue";
import AgoraFooter from "./components/AgoraFooter.vue";
import { mapGetters } from "vuex";
import WalletStatus from "./components/WalletStatus.vue";
import GovernanceStatus from "./components/GovernanceStatus.vue";
import MainMenu from "./components/MainMenu.vue";
import OngoingVote from "./components/OngoingVote.vue";

export default {
  name: "App",
  components: {
    AgoraHeader,
    AgoraFooter,
    WalletStatus,
    GovernanceStatus,
    MainMenu,
    OngoingVote,
  },
  computed: {
    ...mapGetters({
      tokenBalance: "wallet/getTokenBalance",
    }),
  },
  created() {
    this.$store.dispatch("wallet/connect");
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
