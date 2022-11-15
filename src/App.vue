<template>
  <div id="app">
    <router-view></router-view>
    <test-comp></test-comp>
    {{ tokenBalance }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TestComp from "./components/testComp.vue";

export default {
  name: "App",
  components: TestComp,
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
}
</style>
