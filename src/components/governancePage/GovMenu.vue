<template>
  <div id="body">
    <!-- ongoingvote에 들어갈 메뉴(진행중 ,투표,제안,자금운영) -->
    <div
      class="onGoing"
      v-on:click="$emit('switch', 'onGoing')"
      v-bind:class="{ selected: menuState == 'onGoing' }"
    >
      현재 진행중
    </div>
    <div id="smallContainer">
      <div
        class="smallMenu"
        v-on:click="$emit('switch', 'vote')"
        v-bind:class="{ selected: menuState == 'vote' }"
      >
        투표
      </div>
      <div
        class="smallMenu"
        v-on:click="$emit('switch', 'suggest')"
        v-bind:class="{ selected: menuState == 'suggest' }"
      >
        제안
      </div>
      <div
        class="smallMenu"
        v-on:click="$emit('switch', 'fund')"
        v-bind:class="{ selected: menuState == 'fund' }"
      >
        자금운영
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuState: String,
  },
};
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
.onGoing {
  background-color: #001e3d;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  margin-bottom: 0.75rem;
}
.smallMenu {
  background-color: #001e3d;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  flex: 1;
}
.smallMenu:nth-child(2) {
  margin: 0 3rem;
}

.selected {
  background: #3a5d81;
}
</style>
