import { ethers } from "ethers";
import govDatabaseContractABI from "../../contracts/abi/GovDatabase.json";
import CwrongGovABI from "../../contracts/abi/CwrongGov.json";
import voteFactoryContractABI from "../../contracts/abi/VoteFactory.json";
import voteContractABI from "../../contracts/abi/Vote.json";
const state = () => ({
  govDatabaseContract: null,
  govAdressList: null,
  voteFactoryContract: null,
  govDict: {},
  govIDList: [],
  signer: null,
  govLoading: "true",
});

const getters = {
  getGovDatabaseContract(state) {
    return state.govDatabaseContract;
  },
  getVoteFactoryContract(state) {
    return state.voteFactoryContract;
  },
  getGovAdressList(state) {
    return state.govAdressList;
  },
  getGovNum(state) {
    return state.govAdressList.length;
  },
  getSigner(state) {
    return state.signer;
  },
  getGovDict(state) {
    return state.govDict;
  },
  getGovIDList(state) {
    return state.govIDList;
  },
  getGovLoading(state) {
    return state.govLoading;
  },
};

const mutations = {
  setGovDatabaseContracts: function (state, govDatabaseAddress) {
    state.govDatabaseContract = new ethers.Contract(
      govDatabaseAddress,
      govDatabaseContractABI,
      state.signer
    );
  },
  setVoteFactoryContracts: function (state, voteFactoryAddress) {
    state.voteFactoryContract = new ethers.Contract(
      voteFactoryAddress,
      voteFactoryContractABI,
      state.signer
    );
  },
  setGovAdressList: function (state, list) {
    state.govAdressList = list;
  },
  setSigner: (state, signer) => {
    state.signer = signer;
  },
  setGovDict: (state, govDict) => {
    state.govDict = govDict;
  },
  setGovIDList: (state, IDList) => {
    state.govIDList = IDList;
  },
  setGovLoading: (state, boo) => {
    state.govLoading = boo;
  },
};

const actions = {
  async setGovDatabase({ commit, getters, dispatch, rootGetters }) {
    //set govDatabase
    const govDatabaseAddress = await rootGetters[
      "wallet/getViewContract"
    ].getGovDatabaseAddress();
    commit("setSigner", await rootGetters["wallet/getSigner"]);
    commit("setGovDatabaseContracts", govDatabaseAddress);

    //set voteFactory
    const voteFactoryAddress = await rootGetters[
      "wallet/getViewContract"
    ].getVoteFactoryAddress();
    commit("setSigner", await rootGetters["wallet/getSigner"]);
    commit("setVoteFactoryContracts", voteFactoryAddress);

    const govNum = await getters.getGovDatabaseContract.getGovCount();
    var govAdressList = [];

    for (var i = 0; i < govNum; i++) {
      govAdressList.push(await getters.getGovDatabaseContract.getGovAddress(i));
    }
    commit("setGovAdressList", govAdressList);
    dispatch("getGovInfo");
  },

  async getVoteInfo({ getters }, voteID) {
    console.log(getters.getVoteFactoryContract);
    const voteCount = await getters.getVoteFactoryContract.getVoteCount(voteID);
    var voteAdressList = [];
    // console.log(getters.getVoteFactoryContract);
    for (var i = 0; i < voteCount; i++) {
      voteAdressList.push(
        await getters.getVoteFactoryContract.getVoteAddress(voteID, i)
      );
    }
    var voteList = [];
    for (i of voteAdressList) {
      var oneVoteContract = new ethers.Contract(
        i,
        voteContractABI,
        getters.getSigner
      );
      var voteObj = {};

      voteObj["id"] = await oneVoteContract.getVoteID().then((value) => {
        return value.toNumber();
      });

      voteObj["title"] = "tempTitle";

      voteObj["type"] = "vote";
      voteObj["created"] = await oneVoteContract.getCreated();
      voteObj["deadline"] = await oneVoteContract.getDeadline();
      voteObj["deadline"] = voteObj["deadline"].toNumber();

      voteObj["isOption"] = await oneVoteContract.isOption();
      var tempVoteStatus = await oneVoteContract.voteStatus();
      voteObj["voteStatus"] = [...tempVoteStatus];
      var temp = 0;
      for (i = 0; i < voteObj["voteStatus"].length; i++) {
        voteObj["voteStatus"][i] = voteObj["voteStatus"][i].toNumber();
        temp += voteObj["voteStatus"][i];
      }

      voteObj["totalVoteCount"] = temp;
      voteObj["agreePercent"] = parseInt(
        (voteObj["voteStatus"][0] / temp) * 100
      );
      voteObj["agreeNum"] = voteObj["voteStatus"][0];
      voteObj["isEnable"] = false;
      if (voteObj["isEnable"] == false) {
        voteObj["state"] = "going";
      } else {
        if (voteObj["agreePercent"] >= 50) voteObj["state"] = "adopt";
        else voteObj["state"] = "deny";
      }
      if (voteObj["isEnable"] == true) {
        voteObj["voteResult"] = await oneVoteContract.voteResult();
      }
      voteObj["contract"] = oneVoteContract;

      // console.log(new Date(voteObj["deadline"].toNumber() * 1000));

      if (!voteObj["isOption"]) {
        voteList.push(voteObj);
      }
    }

    return voteList;
  },
  async getGovInfo({ commit, getters, dispatch }) {
    var govAdressList = getters.getGovAdressList;
    var govDict = {};
    var govIDList = [];
    var sortList = [];
    for (var i of govAdressList) {
      var oneGovContract = new ethers.Contract(
        i,
        CwrongGovABI,
        getters.getSigner
      );
      var govObj = {};
      govObj["id"] = await oneGovContract.getGovID();
      govObj["name"] = await oneGovContract.getGovName();
      govObj["leaderAddress"] = await oneGovContract.getGovLeader();
      govObj["memberCount"] = await oneGovContract.getMemberCount();
      govObj["voteCount"] = await oneGovContract.getVoteCount();
      govObj["proposalCount"] = await oneGovContract.getProposalCount();
      govObj["fundingCount"] = await oneGovContract.getFundingCount();
      govObj["presentBalance"] = await oneGovContract.getPresentBalance();
      govObj["totalBalance"] = await oneGovContract.getTotalBalance();
      govObj["voteList"] = await dispatch("getVoteInfo", govObj["id"]);

      console.log(govObj);
      govDict[govObj["id"]] = govObj;
      govIDList.push(govObj["id"]);
      sortList.push([govObj["totalBalance"], govObj["id"]]);

      // dispatch("votes/setVoteDatabase", govObj["id"], { root: true });
    }
    sortList.sort().reverse();
    for (i = 0; i < sortList.length; i++) {
      govDict[sortList[i][1]]["ranking"] = i + 1;
    }

    commit("setGovDict", govDict);
    commit("setGovIDList", govIDList);

    commit("setGovLoading", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
