<template>
  <div id="app">
    <agora-header></agora-header>
    <router-view></router-view>
    {{ tokenBalance }}
    <agora-footer></agora-footer>
  </div>
</template>

<script>
import AgoraHeader from "./components/AgoraHeader.vue";
import AgoraFooter from "./components/AgoraFooter.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    AgoraHeader,
    AgoraFooter,
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
