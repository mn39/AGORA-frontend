<template>
  <div id="appVue">
    <agora-header></agora-header>
    <router-view></router-view>
    <test-comp></test-comp>
    <!-- {{ tokenBalance }} -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TestComp from "./components/testComp.vue";
import AgoraHeader from "./components/AgoraHeader.vue";

export default {
  name: "App",
  components: { TestComp, AgoraHeader },

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
#appVue {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 7rem;
  background-color: #082e55;
  padding-bottom: 3rem;
}
</style>
