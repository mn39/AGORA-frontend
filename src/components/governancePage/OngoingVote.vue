<template>
  <div id="bodyContainer">
    <div v-if="nowMode == 'showVotes'" id="body">
      <div class="bodyTitle">
        <div></div>
        <div v-if="menuState == 'onGoing'">진행중인 사안</div>
        <div v-if="menuState == 'vote'">투표</div>
        <div v-if="menuState == 'proposal'">제안</div>
        <div v-if="menuState == 'funding'">자금운영</div>
        <div class="newOneContainer">
          <span class="newOne" v-on:click="newOne">새 안건 작성</span>
        </div>
      </div>
      <ul>
        <template v-if="menuState == 'onGoing'">
          <li
            v-for="onGoingInfo in onGoingList"
            v-bind:key="onGoingInfo.type + String(onGoingInfo.id)"
            v-on:click="goOneVote(onGoingInfo)"
          >
            <div class="line"></div>
            <div class="onGoingHeader">
              <div>
                <template v-if="onGoingInfo.type == 'vote'"
                  >투표 #{{ onGoingInfo.id }}</template
                >
                <template v-else-if="onGoingInfo.type == 'proposal'"
                  >제안 #{{ onGoingInfo.id }}</template
                >
                <template v-else-if="onGoingInfo.type == 'funding'"
                  >자금운영 #{{ onGoingInfo.id }}</template
                >

                <template v-if="menuState != 'onGoing'">
                  <template v-if="onGoingInfo.state == 'going'">
                    <div class="cssState s-ongoing">진행중</div>
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
                >총 투표 : {{ onGoingInfo.totalCount }}</template
              >
              <template v-if="onGoingInfo.type == 'proposal'"
                >현재 참여한 멤버 수 : {{ onGoingInfo.totalCount }}</template
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
                <div>{{ onGoingInfo.totalCount - onGoingInfo.agreeNum }}</div>
              </div>
            </div>
          </li>
        </template>
        <template v-else>
          <li
            v-for="onGoingInfo in groupList[menuState]"
            v-bind:key="onGoingInfo.id"
            v-on:click="goOneVote(onGoingInfo)"
          >
            <div class="line"></div>
            <div class="onGoingHeader">
              <div>
                <template v-if="onGoingInfo.type == 'vote'"
                  >투표 #{{ onGoingInfo.id }}</template
                >
                <template v-else-if="onGoingInfo.type == 'proposal'"
                  >제안 #{{ onGoingInfo.id }}</template
                >
                <template v-else-if="onGoingInfo.type == 'funding'"
                  >자금운영 #{{ onGoingInfo.id }}</template
                >

                <template v-if="menuState != 'onGoing'">
                  <template v-if="onGoingInfo.state == 'going'">
                    <div class="cssState s-ongoing">진행중</div>
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
                >총 투표 : {{ onGoingInfo.totalCount }}</template
              >
              <template v-if="onGoingInfo.type == 'proposal'"
                >현재 참여한 멤버 수 : {{ onGoingInfo.totalCount }}</template
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
                <div>
                  {{ onGoingInfo.totalCount - onGoingInfo.agreeNum }}
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div v-else-if="nowMode == 'oneVote'" id="body">
      <div class="bodyTitle oneVoteTitle">
        <div></div>
        <div>
          <template v-if="oneVote.type == 'vote'"
            >투표 #{{ oneVote.id }}</template
          >
          <template v-else-if="oneVote.type == 'proposal'"
            >제안 #{{ oneVote.id }}</template
          >
          <template v-else-if="oneVote.type == 'funding'"
            >자금운영 #{{ oneVote.id }}</template
          >
        </div>
        <div class="stateContainer">
          <template v-if="oneVote.state == 'going'">
            <span class="cssState s-ongoing">진행중</span>
          </template>
          <template v-if="oneVote.state == 'adopt'">
            <span class="cssState s-adopt">가결</span>
          </template>
          <template v-if="oneVote.state == 'deny'">
            <span class="cssState s-deny">부결</span>
          </template>
        </div>
      </div>
      <div class="line"></div>
      <div class="contentContainer">
        <div class="oneVoteSubtitle">{{ oneVote.title }}</div>
        <div class="oneVoteContents">{{ oneVote.content }}</div>

        <div class="choiceContainer">
          <div class="oneChoice" v-on:click="showVoteModal(0)">찬성</div>
          <div class="oneChoice" v-on:click="showVoteModal(1)">반대</div>
        </div>
      </div>
    </div>
    <div v-else-if="nowMode == 'writeVote'" id="body">
      <div class="bodyTitle oneVoteTitle" v-on:click="changeWriteMode">
        <div></div>
        <div>
          <template v-if="writeObj.mode == 'vote'">새 투표 작성</template>
          <template v-else-if="writeObj.mode == 'proposal'"
            >새 제안 작성</template
          >
          <template v-else-if="writeObj.mode == 'funding'"
            >새 자금운영 작성</template
          >
        </div>
        <div class="newOneContainer"></div>
      </div>
      <div class="line"></div>
      <div class="contentContainer">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          v-model="writeObj.title"
          class="writeTitle oneVoteSubtitle"
        />
        <input
          type="text"
          placeholder="내용을 입력해주세요"
          v-model="writeObj.contents"
          class="writeContents oneVoteContents"
        />

        <div class="choiceContainer">
          <div class="oneChoice" v-on:click="writeOne(writeObj)">작성</div>
        </div>
      </div>
    </div>
    <Modal v-if="showModal" @close="showModal = false">
      <div slot="header" class="modalTitle">
        <div></div>
        <div>
          <template v-if="oneVote.type == 'vote'"
            >투표 #{{ oneVote.id }}</template
          >
          <template v-else-if="oneVote.type == 'proposal'"
            >제안 #{{ oneVote.id }}</template
          >
          <template v-else-if="oneVote.type == 'funding'"
            >자금운영 #{{ oneVote.id }}</template
          >
        </div>
        <div @click="showModal = false">X</div>
      </div>
      <div class="modalBody" slot="body">
        <template v-if="oneVote.type == 'vote'">
          <input
            class="modalBalance"
            v-model="voteValue"
            placeholder="0"
            type="number"
          />
        </template>
        <template v-else>
          <div class="modalBalance">1</div>
        </template>

        <template v-if="oneVote.type == 'vote'"
          ><div
            class="modalButton"
            v-on:click="voteIt(voteOption, voteValue, oneVote)"
          >
            <template v-if="voteOption == 0">찬성</template>
            <template v-else>반대</template>
          </div>
        </template>
        <template v-else
          ><div class="modalButton" v-on:click="voteIt(voteOption, 1, oneVote)">
            <template v-if="voteOption == 0">찬성</template>
            <template v-else>반대</template>
          </div>
        </template>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Modal from "./VotingModal.vue";
export default {
  components: {
    Modal,
  },
  props: { menuState: String, id: String },
  computed: {
    groupList() {
      var groupList = {
        onGoing: [],
        vote: [],
        proposal: [],
        funding: [],
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
      return this.govLoading ? [] : this.govInfo[this.id]["allVoteList"];
    },
  },
  data() {
    return {
      writeObj: {
        mode: "vote",
        title: "",
        contents: "",
      },
      nowMode: "showVotes",
      showModal: false,
      voteOption: 0,
      voteValue: 0,
      oneVote: {
        id: 0,
        type: "vote",
        totalVoteCount: 2463,
        title: "저녁으로 짬뽕말고 짜장면을 먹을까요?",
        agreePercent: 60,
        agreeNum: 1502,
        state: "going",
      },
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
      ],
    };
  },
  methods: {
    goOneVote(oneVoteData) {
      this.nowMode = "oneVote";
      this.oneVote = oneVoteData;
    },
    goMenu() {
      this.nowMode = "showVotes";
    },
    showVoteModal(option) {
      console.log("show");
      this.voteOption = option;
      this.showModal = true;
    },
    async voteIt(option, value, voteObj) {
      this.showModal = false;
      if (voteObj.type == "vote") {
        await voteObj["contract"].voteOne(option, value);
      } else {
        await voteObj["contract"].voteOne(option);
      }
      console.log(option, value, voteObj);
    },
    changeWriteMode() {
      if (this.writeObj["mode"] == "vote") {
        this.writeObj["mode"] = "proposal";
      } else if (this.writeObj["mode"] == "proposal") {
        this.writeObj["mode"] = "funding";
      } else {
        this.writeObj["mode"] = "vote";
      }
    },
    async writeOne(data) {
      var id;
      if (data.mode == "vote") {
        id = this.groupList.vote.length;
        await this.govInfo[this.id]["contract"].createVote(10);
      } else if (data.mode == "proposal") {
        id = this.groupList.proposal.length;
        await this.govInfo[this.id]["contract"].createProposal(10);
      } else if (data.mode == "funding") {
        id = this.groupList.funding.length;
        // await this.govInfo[this.id]["contract"].createFunding(10, 1000);
      }
      console.log(
        id,
        "http://13.125.93.131/api/v1/" + data.mode + "/" + this.id + "/" + id
      );
      const axios = require("axios");
      var sendingData = JSON.stringify({
        data: { title: data.title, content: data.contents },
      });
      var config = {
        method: "post",
        url:
          "http://13.125.93.131/api/v1/" + data.mode + "/" + this.id + "/" + id,
        headers: {
          "Content-Type": "application/json",
        },
        data: sendingData,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newOne() {
      this.nowMode = "writeVote";
    },
  },
};
</script>

<style scoped>
#bodyContainer {
  width: 100%;
  height: 100%;
}
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
  padding: 0 3rem;
}
.bodyTitle div {
  flex: 1;
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

.oneVoteTitle {
  padding: 0 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.oneVoteTitle div {
  flex: 1;
}

.stateContainer {
  display: flex;
  justify-content: flex-end;
}

.oneVoteSubtitle {
  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 3rem;
}

.oneVoteContents {
  flex: 1;
}

.contentContainer {
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-bottom: 3rem;
}

.choiceContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 5rem;
}
.oneChoice {
  width: 8rem;
  height: 3rem;
  border-radius: 0.5rem;

  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  /* identical to box height */

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
}

.modalTitle {
  display: flex;
  justify-content: space-between;
}
.modalBody {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.modalButton {
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 2.5rem;
  border-radius: 0.375rem;
}
.modalBalance {
  width: 10rem;
  height: 7rem;
  text-align: center;
  background: #001e3d;
  font-size: 2rem;
  color: white;
  border: none;
}
input:focus {
  outline: none;
}

input {
  border: none;
}

.writeTitle {
  text-align: center;
  background: #001e3d;
  font-size: 2rem;
  color: white;
  border: none;
}

.writeContents {
  text-align: center;
  background: #001e3d;
  font-size: 1.5rem;
  color: white;
  border: none;
  margin-bottom: 2rem;
}
.newOne {
  height: 3rem;
  width: 10rem;
  z-index: 99;
  right: 10rem;
  bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Atomy";
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;

  border-radius: 0.75rem;
  color: white;
  background: #3a5d81;
  box-shadow: 0px 3px 25px rgba(255, 255, 255, 0.1);
}

.newOneContainer {
  display: flex;
  justify-content: flex-end;
}
</style>
