<template>
  <div id="mainGovListBody">
    <!-- <transition-group name="slide" class="govtransition"> -->
    <span
      v-for="(gov, index) in govList"
      v-bind:key="gov.name"
      class="slide"
      v-bind:style="{
        // left: 1 + (index - 5) * 220 - 90 + 'px',
        // backgroundColor: colorListR[n - 1],
      }"
      v-bind:class="{ mainSlide: index == 2 }"
    >
      <div class="imgFrame">
        <img v-bind:src="gov.imgSrc" alt="img" />
      </div>
      <div id="govName">{{ gov.name }}</div>
      <div v-if="index == 2" class="textFrame">
        <div class="detail">
          <div>전체 자금 순위</div>
          <div>{{ gov.rank }}</div>
        </div>

        <div class="detail">
          <div>현재 자금</div>
          <div>{{ gov.nowBalance }}</div>
        </div>

        <div class="detail">
          <div>맴버 수</div>
          <div>{{ gov.rank }}</div>
        </div>
      </div>
    </span>
    <!-- </transition-group> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      govList: [
        {
          name: "포비",
          rank: 3,
          nowBalance: 12583,
          member: 200,
          imgSrc: require("./../../assets/Agora_symbol 4.svg"),
        },
        {
          name: "name",
          rank: 2,
          nowBalance: 12583,
          member: 200,
          imgSrc: require("./../../assets/Agora_symbol 4.svg"),
        },
        {
          name: "크롱",
          rank: 1,
          nowBalance: 12583,
          member: 200,
          imgSrc: require("./../../assets/Agora_symbol 4.svg"),
        },
        {
          name: "크롱",
          rank: 4,
          nowBalance: 12583,
          member: 200,
          imgSrc: require("./../../assets/Agora_symbol 4.svg"),
        },
        {
          name: "크롱",
          rank: 5,
          nowBalance: 12583,
          member: 200,
          imgSrc: require("./../../assets/Agora_symbol 4.svg"),
        },
      ],
    };
  },
};
</script>

<style scoped>
#mainGovListBody {
  height: 30rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
}

.slide {
  width: 17rem;
  height: 20rem;
  background: #001e3d;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.mainSlide {
  transform: translateY(-7%);
  width: 20rem;
  height: 23rem;
}
.slide img {
  width: 9rem;
  height: 9rem;
}

#govName {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.detail {
  display: flex;
}
.detail div {
  flex: 1;
}
.imgFrame {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.textFrame {
  padding: 0 3rem;
  font-size: 1rem;
}
.textFrame div {
  margin-bottom: 0.2rem;
}
</style>
