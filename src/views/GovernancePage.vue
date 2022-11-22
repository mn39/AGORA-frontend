<template>
  <div id="app">
    <div id="status">
      <governance-status v-bind:id="$route.params.id"></governance-status>
      <wallet-status></wallet-status>
    </div>

    <div id="mainBody">
      <gov-menu v-bind:menuState="state" v-on:switch="switchList"></gov-menu>
      <ongoing-vote
        v-bind:menuState="state"
        v-bind:id="$route.params.id"
      ></ongoing-vote>
    </div>
    <agora-footer></agora-footer>
  </div>
</template>

<script>
import AgoraFooter from "../components/AgoraFooter.vue";
import WalletStatus from "../components/WalletStatus.vue";
import GovernanceStatus from "../components/governancePage/GovernanceStatus.vue";
import GovMenu from "../components/governancePage/GovMenu.vue";
import OngoingVote from "../components/governancePage/OngoingVote.vue";

export default {
  components: {
    OngoingVote,
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
  computed: {},
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
