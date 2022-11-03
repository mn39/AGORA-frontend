<template>
  <div id="rankBody">
    <div class="oneItem">
      <div class="title">총 자금</div>
    </div>
    <div v-for="(gov, index) in govList" :key="index" class="oneItem">
      <div>#{{ index + 1 }}</div>
      <div>{{ gov.name }}</div>
      <div>
        {{ gov.nowBalance }}
        <img src="../../assets/Agora_symbol 4.svg" alt="Agora" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      govList: [
        {
          name: "크롱",
          rank: 1,
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
          rank: 1,
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
          rank: 1,
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
.oneItem {
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3rem;
  padding-right: 4rem;
  border: 1px solid #082e55;
}
#rankBody {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.75rem;

  background: #001e3d;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  margin-right: 2rem;
}
.title {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  height: 1.5rem;
}
</style>
