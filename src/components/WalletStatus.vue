<template>
  <div class="body">
    <div id="walletText">내 지갑</div>
    <div id="tokenNum">{{ myToken }}</div>
    <div id="symbol">
      <img src="./../assets/Agora_symbol 4.svg" alt="agora" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myToken: 5,
    };
  },
};
</script>

<style scoped>
.body {
  width: 20vw;
  height: 6rem;
  background: #001e3d;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.625rem;
  color: #ffffff;

  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

#walletText {
  flex: 4;
}

#tokenNum {
  flex: 1;
}

#symbol {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#symbol img {
  height: 1.75rem;
}
</style>
