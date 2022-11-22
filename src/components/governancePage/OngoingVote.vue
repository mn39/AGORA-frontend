<template>
  <div id="body">
    <div class="bodyTitle">진행중인 사안</div>
    <ul>
      <template v-if="menuState == 'onGoing'">
        <li v-for="onGoingInfo in onGoingList" v-bind:key="onGoingInfo.id">
          <div class="line"></div>
          <div class="onGoingHeader">
            <div>
              <template v-if="onGoingInfo.type == 'vote'"
                >투표 #{{ onGoingInfo.id }}</template
              >
              <template v-else-if="onGoingInfo.type == 'suggest'"
                >제안 #{{ onGoingInfo.id }}</template
              >

              <template v-if="menuState != 'onGoing'">
                <template v-if="onGoingInfo.state == 'going'">
                  <div class="cssState s-ongoing">진행 중</div>
                </template>
                <template v-if="onGoingInfo.state == 'adopt'">
                  <div class="cssState s-adopt">가결</div>
                </template>
                <template v-if="onGoingInfo.state == 'deny'">
                  <div class="cssState s-deny">부결</div>
                </template>
              </template>
            </div>
            <template v-if="onGoingInfo.type == 'vote'"
              >총 투표 : {{ onGoingInfo.totalVoteCount }}</template
            >
            <template v-if="onGoingInfo.type == 'suggest'"
              >현재 참여한 멤버 수 : {{ onGoingInfo.totalVoteCount }}</template
            >
          </div>
          <div class="onGoingTitle">{{ onGoingInfo.title }}</div>
          <div class="smallWhite">
            <div class="textLine">
              <div class="percent">{{ onGoingInfo.agreePercent }}%</div>
              <div>{{ onGoingInfo.agreeNum }}</div>
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
                  <img
                    id="whiteArrow"
                    src="../../assets/whiteArrow.svg"
                    alt=""
                  />
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
              <div>{{ onGoingInfo.totalVoteCount - onGoingInfo.agreeNum }}</div>
            </div>
          </div>
        </li>
      </template>
      <template v-else>
        <li
          v-for="onGoingInfo in groupList[menuState]"
          v-bind:key="onGoingInfo.id"
        >
          <div class="line"></div>
          <div class="onGoingHeader">
            <div>
              <template v-if="onGoingInfo.type == 'vote'"
                >투표 #{{ onGoingInfo.id }}</template
              >
              <template v-else-if="onGoingInfo.type == 'suggest'"
                >제안 #{{ onGoingInfo.id }}</template
              >

              <template v-if="menuState != 'onGoing'">
                <template v-if="onGoingInfo.state == 'going'">
                  <div class="cssState s-ongoing">진행 중</div>
                </template>
                <template v-if="onGoingInfo.state == 'adopt'">
                  <div class="cssState s-adopt">가결</div>
                </template>
                <template v-if="onGoingInfo.state == 'deny'">
                  <div class="cssState s-deny">부결</div>
                </template>
              </template>
            </div>
            <template v-if="onGoingInfo.type == 'vote'"
              >총 투표 : {{ onGoingInfo.totalVoteCount }}</template
            >
            <template v-if="onGoingInfo.type == 'suggest'"
              >현재 참여한 멤버 수 : {{ onGoingInfo.totalVoteCount }}</template
            >
          </div>
          <div class="onGoingTitle">{{ onGoingInfo.title }}</div>
          <div class="smallWhite">
            <div class="textLine">
              <div class="percent">{{ onGoingInfo.agreePercent }}%</div>
              <div>{{ onGoingInfo.agreeNum }}</div>
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
                  <img
                    id="whiteArrow"
                    src="../../assets/whiteArrow.svg"
                    alt=""
                  />
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
              <div>{{ onGoingInfo.totalVoteCount - onGoingInfo.agreeNum }}</div>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: { menuState: String, id: String },
  computed: {
    groupList() {
      var groupList = {
        onGoing: [],
        vote: [],
        suggest: [],
        fund: [],
      };
      for (var temp in this.onGoingList) {
        groupList[this.onGoingList[temp].type].push(this.onGoingList[temp]);
      }
      return groupList;
    },
    ...mapGetters({
      govLoading: "gov/getGovLoading",
      govInfo: "gov/getGovDict",
    }),
    onGoingList() {
      return this.govLoading ? [] : this.govInfo[this.id]["voteList"];
    },
  },
  data() {
    return {
      onGoingTempList: [
        {
          id: 25,
          type: "vote",
          totalVoteCount: 2463,
          title: "저녁으로 짬뽕말고 짜장면을 먹을까요?",
          agreePercent: 60,
          agreeNum: 1502,
          state: "going",
        },
        {
          id: 22,
          type: "suggest",
          totalVoteCount: 110,
          title: "1 표당 100 AGT로 하는건 어떨까요?",
          agreePercent: 20,
          agreeNum: 34,
          state: "going",
        },
        {
          id: 23,
          type: "vote",
          totalVoteCount: 2463,
          title: "저녁으로 짬뽕말고 짜장면을 먹을까요?",
          agreePercent: 87,
          agreeNum: 1502,
          state: "going",
        },
        {
          id: 35,
          type: "suggest",
          totalVoteCount: 110,
          title: "1 표당 100 AGT로 하는건 어떨까요?",
          agreePercent: 20,
          agreeNum: 34,
          state: "going",
        },
        {
          id: 45,
          type: "vote",
          totalVoteCount: 2463,
          title: "저녁으로 짬뽕말고 짜장면을 먹을까요?",
          agreePercent: 87,
          agreeNum: 1502,
          state: "adopt",
        },
        {
          id: 5,
          type: "suggest",
          totalVoteCount: 110,
          title: "1 표당 100 AGT로 하는건 어떨까요?",
          agreePercent: 20,
          agreeNum: 34,
          state: "deny",
        },
        {
          id: 85,
          type: "vote",
          totalVoteCount: 2463,
          title: "저녁으로 짬뽕말고 짜장면을 먹을까요?",
          agreePercent: 87,
          agreeNum: 1502,
          state: "going",
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

  padding: 0 3rem;
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

.totalVoteCount {
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

.cssState {
  width: 6rem;
  height: 2.5rem;
  border-radius: 0.5rem;

  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  /* identical to box height */

  display: flex;
  align-items: center;
  justify-content: center;
  color: black;

  margin-left: 1rem;
}

.s-ongoing {
  background: #d9d9d9;
}

.s-adopt {
  background: #47ac3a;
}

.s-deny {
  background: #ff0000;
}

.onGoingHeader div:first-child {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
