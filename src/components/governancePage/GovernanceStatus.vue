<template>
  <div id="body">
    <!-- ongingVote에 들어갈 거버넌스 스테이터스 -->
    <div>cWrong</div>
    <div class="oneStatus">
      <div class="name">순위</div>
      <div class="value"># {{ governance.ranking }}</div>
    </div>

    <div class="oneStatus">
      <div class="name">투표</div>
      <div class="value">{{ governance.voteCount }}</div>
    </div>

    <div class="oneStatus">
      <div class="name">제안</div>
      <div class="value">{{ governance.proposalCount }}</div>
    </div>

    <div class="oneStatus">
      <div class="name">자금운영</div>
      <div class="value">{{ governance.fundingCount }}</div>
    </div>

    <div class="oneStatus">
      <div class="name">맴버 수</div>
      <div class="value">{{ governance.memberCount }}</div>
    </div>

    <div class="oneStatus">
      <div class="name">현재 자금</div>
      <div class="value nowBalance">
        {{ governance.balance }}
        <img src="../../assets/Agora_symbol 4.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    id: String,
  },
  data() {
    return {
      tempGov: {
        ranking: 0,
        voteCount: 0,
        proposalCount: 0,
        fundingCount: 0,
        memberCount: 0,
        presentBalance: 0,
      },
    };
  },
  computed: {
    governance() {
      return this.govLoading ? this.tempGov : this.govInfo[this.id];
    },
    ...mapGetters({
      govLoading: "gov/getGovLoading",
      govInfo: "gov/getGovDict",
    }),
  },
};
</script>

<style scoped>
#body {
  height: 6rem;
  width: 60vw;
  background: #001e3d;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.625rem;
  color: #ffffff;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.name {
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  color: #babcbe;
}

.nowBalance {
  display: flex;
  align-items: center;
}

.nowBalance img {
  margin-left: 8px;
  width: 1.625rem;
}
</style>
