import { ethers } from "ethers";
import govDatabaseContractABI from "../../contracts/abi/GovDatabase.json";
import CwrongGovABI from "../../contracts/abi/CwrongGov.json";
const state = () => ({
  govDatabaseContract: null,
  govAdressList: null,
  govDict: {},
  govIDList: [],
  signer: null,
  govLoading: "true",
});

const getters = {
  getGovDatabaseContract(state) {
    return state.govDatabaseContract;
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
    const govDatabaseAddress = await rootGetters[
      "wallet/getViewContract"
    ].getGovDatabaseAddress();
    commit("setSigner", await rootGetters["wallet/getSigner"]);
    commit("setGovDatabaseContracts", govDatabaseAddress);
    const govNum = await getters.getGovDatabaseContract.getGovCount();
    var govAdressList = [];

    for (var i = 0; i < govNum; i++) {
      govAdressList.push(await getters.getGovDatabaseContract.getGovAddress(i));
    }
    commit("setGovAdressList", govAdressList);
    dispatch("getGovInfo");
  },

  async getGovInfo({ commit, getters }) {
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
      govDict[govObj["id"]] = govObj;
      govIDList.push(govObj["id"]);
      sortList.push([govObj["totalBalance"], govObj["id"]]);
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
