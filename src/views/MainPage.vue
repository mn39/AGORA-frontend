<template>
  <div id="mainBody">
    <main-gov-list></main-gov-list>
    <div class="bot">
      <fund-ranking></fund-ranking>
      <ongoing-main></ongoing-main>
    </div>
  </div>
</template>

<script>
import OngoingMain from "../components/mainPage/OngoingMain.vue";
import FundRanking from "../components/mainPage/FundRanking.vue";
import MainGovList from "../components/mainPage/MainGovList.vue";
export default {
  components: { MainGovList, FundRanking, OngoingMain },
};
</script>

<style scoped>
#mainBody {
  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;

  color: #ffffff;

  padding: 0 3rem;

  background-color: #082e55;
}

.bot {
  display: flex;
  justify-content: space-between;
}
</style>
