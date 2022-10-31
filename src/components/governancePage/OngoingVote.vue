<template>
  <div id="body">
    <div class="bodyTitle">진행중인 사안</div>
    <ul>
      <li v-for="onGoingInfo in this.onGoingList" v-bind:key="onGoingInfo.num">
        <div class="line"></div>
        <div class="onGoingHeader">
          <div>
            <template v-if="onGoingInfo.type == 'vote'"
              >투표 #{{ onGoingInfo.num }}</template
            >
            <template v-else-if="onGoingInfo.type == 'suggest'"
              >제안 #{{ onGoingInfo.num }}</template
            >
          </div>
          <div class="totalNum">총 투표 : {{ onGoingInfo.totalNum }}</div>
        </div>
        <div class="onGoingTitle">{{ onGoingInfo.title }}</div>
        <div class="smallWhite">
          <div class="textLine">
            <div class="percent">{{ onGoingInfo.agreePercent }}%</div>
            <div>1502</div>
          </div>
          <div class="textLine">
            <div>찬성</div>
            <div></div>
          </div>
          <div class="lineContainer">
            <div class="lineAbsolute">
              <div
                class="redLine"
                v-bind:style="{ width: onGoingInfo.agreePercent + '%' }"
              >
                <div class="redLineReal"></div>
                <img id="redArrow" src="../../assets/redArrow.svg" alt="" />
                <img id="whiteArrow" src="../../assets/whiteArrow.svg" alt="" />
              </div>
              <div class="whiteLine"></div>
            </div>
            <div></div>
          </div>
          <div class="textLine">
            <div>반대</div>
            <div></div>
          </div>
          <div class="textLine">
            <div class="percent">{{ 100 - onGoingInfo.agreePercent }}%</div>
            <div>1502</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onGoingList: [
        {
          num: 25,
          type: "vote",
          totalNum: 2463,
          title: "저녁으로 짬뽕말고 짜장면을 먹을까요?",
          agreePercent: 60,
          agreeNum: 1502,
        },
        {
          num: 25,
          type: "suggest",
          totalNum: 110,
          title: "1 표당 100 AGT로 하는건 어떨까요?",
          agreePercent: 20,
          agreeNum: 1502,
        },
        {
          num: 25,
          type: "vote",
          totalNum: 2463,
          title: "저녁으로 짬뽕말고 짜장면을 먹을까요?",
          agreePercent: 87,
          agreeNum: 1502,
        },
      ],
    };
  },
};
</script>

<style scoped>
#body {
  background: #001e3d;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;

  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  color: white;
}

.smallWhite {
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  padding: 0 3rem;
}
.bodyTitle {
  font-size: 1.5rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding-bottom: 1.5rem;
}

.line {
  border: 1px solid #082e55;
  margin-bottom: 3rem;
}

.onGoingHeader {
  font-size: 1.5rem;
  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 4rem;
}

.onGoingTitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.lineContainer {
  flex: 1;
}

.textLine {
  width: 3rem;
}

.percent {
  margin-bottom: 1rem;
}

.lineContainer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: 0 0.5rem;
}

.lineContainer div {
  flex: 1;
}
.lineAbsolute {
  position: relative;
  flex: 1;
  margin-bottom: 1rem;
}
.whiteLine {
  position: absolute;
  height: 4px;
  width: 100%;
  background-color: white;
  top: 50%;
  transform: translate(0, -50%);
}

.redLine {
  z-index: 1;
  position: absolute;
  height: 4px;
  width: 60%;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}

.redLineReal {
  background-color: #ff0000;
  height: 4px;
}

.textLine div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.totalNum {
  font-size: 1.25rem;
}

#redArrow {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(15%, -50%);
  z-index: -1;
}
#whiteArrow {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(85%, -50%);
  z-index: -1;
}
</style>
