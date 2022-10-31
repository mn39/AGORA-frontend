<template>
  <div id="body">
    <div id="onGoing">현재 진행중</div>
    <div id="smallContainer">
      <div id="smallMenu">투표</div>
      <div id="smallMenu">제안</div>
      <div id="smallMenu">자금운영</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#body {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;

  margin-bottom: 3rem;
}
#body div {
  height: 2.5rem;
  border-radius: 0.75rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
#smallContainer {
  display: flex;
  flex-direction: row;
}
#onGoing {
  background-color: #3a5d81;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  margin-bottom: 0.75rem;
}
#smallMenu {
  background-color: #001e3d;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  flex: 1;
}
#smallMenu:nth-child(2) {
  margin: 0 3rem;
}
</style>
