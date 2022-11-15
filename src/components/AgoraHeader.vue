<template>
  <div class="header">
    <img src="../assets/gnb_logo.svg" alt="Agora" />
    <div class="wallet">지갑 연결</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  background: #001e3d;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  padding: 0 12vw;
}

.header img {
  height: 3rem;
}

.wallet {
  width: 7rem;
  height: 2.5rem;
  background: #e9b66a;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  color: #ffffff;
}
</style>
