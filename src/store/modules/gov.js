import { ethers } from "ethers";
import govDatabaseContractABI from "../../contracts/abi/GovDatabase.json";
import CwrongGovABI from "../../contracts/abi/CwrongGov.json";
import voteFactoryContractABI from "../../contracts/abi/VoteFactory.json";
import voteContractABI from "../../contracts/abi/Vote.json";
import fundingFactoryContractABI from "../../contracts/abi/FundingFactory.json";
import fundingContractABI from "../../contracts/abi/Funding.json";
import proposalFactoryContractABI from "../../contracts/abi/ProposalFactory.json";
import proposalContractABI from "../../contracts/abi/Proposal.json";
// import NFTContractABI from "../../contracts/abi/CwrongNFT.json";

const axios = require("axios");
const state = () => ({
  govDatabaseContract: null,
  govAdressList: null,
  voteFactoryContract: null,
  fundingFactoryContract: null,
  proposalFactoryContract: null,
  govDict: {},
  govIDList: [],
  signer: null,
  govLoading: "true",
  sortGovList: [],
});

const getters = {
  getGovDatabaseContract(state) {
    return state.govDatabaseContract;
  },
  getVoteFactoryContract(state) {
    return state.voteFactoryContract;
  },
  getFundingFactoryContract(state) {
    return state.fundingFactoryContract;
  },
  getProposalFactoryContract(state) {
    return state.proposalFactoryContract;
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
  getSortList(state) {
    return state.sortGovList;
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
  setFundingFactoryContracts: function (state, fundingFactoryAddress) {
    state.fundingFactoryContract = new ethers.Contract(
      fundingFactoryAddress,
      fundingFactoryContractABI,
      state.signer
    );
  },
  setProposalFactoryContracts: function (state, proposalFactoryAddress) {
    state.proposalFactoryContract = new ethers.Contract(
      proposalFactoryAddress,
      proposalFactoryContractABI,
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
  setSortGovList: (state, sortList) => {
    state.sortGovList = sortList;
  },
  makeVoteContract: (state, adress) => {
    return new ethers.Contract(adress, voteContractABI, state.signer);
  },
  makeProposalContract: (state, adress) => {
    return new ethers.Contract(adress, proposalContractABI, state.signer);
  },
  makeFundingContract: (state, adress) => {
    return new ethers.Contract(adress, fundingContractABI, state.signer);
  },
};

const actions = {
  async setGovDatabase({ commit, getters, dispatch, rootGetters }) {
    // await rootGetters["wallet/getTokenContract"].mintFor(
    //   rootGetters["wallet/getWalletAddress"],
    //   4000
    // );

    const govDatabaseAddress = await rootGetters[
      "wallet/getViewContract"
    ].getGovDatabaseAddress();
    commit("setSigner", await rootGetters["wallet/getSigner"]);
    commit("setGovDatabaseContracts", govDatabaseAddress);
    // var nftAddress = await getters.getGovDatabaseContract.getNFTAddress(0);
    // var nftContract = new ethers.Contract(
    //   nftAddress,
    //   NFTContractABI,
    //   getters.getSigner
    // );
    // 0x92be24D66ea0Cc8Fa40e13Cc713E1Ae0527BFfdE
    // console.log(rootGetters["wallet/getWalletAddress"]);
    // nftContract.mint("0x92be24D66ea0Cc8Fa40e13Cc713E1Ae0527BFfdE", 3);

    //set voteFactory
    const voteFactoryAddress = await rootGetters[
      "wallet/getViewContract"
    ].getVoteFactoryAddress();
    commit("setVoteFactoryContracts", voteFactoryAddress);
    // console.log(getters.getVoteFactoryContract, "voteFactory");

    const fundingFactoryAddress = await rootGetters[
      "wallet/getViewContract"
    ].getFundingFactoryAddress();
    commit("setFundingFactoryContracts", fundingFactoryAddress);
    const proposalFactoryAddress = await rootGetters[
      "wallet/getViewContract"
    ].getProposalFactoryAddress();
    commit("setProposalFactoryContracts", proposalFactoryAddress);

    const govNum = await getters.getGovDatabaseContract.getGovCount();
    console.log(govNum.toNumber(), ">???");
    var govAdressList = [];

    for (var i = 0; i < govNum; i++) {
      govAdressList.push(await getters.getGovDatabaseContract.getGovAddress(i));
    }
    // console.log(govAdressList, govNum);

    commit("setGovAdressList", govAdressList);
    dispatch("getGovInfo");
  },

  async getVoteInfo({ getters }, govID) {
    // console.log(getters.getVoteFactoryContract);
    const voteCount = await getters.getVoteFactoryContract.getVoteCount(govID);
    var voteAdressList = [];

    for (var i = 0; i < voteCount; i++) {
      voteAdressList.push(
        await getters.getVoteFactoryContract.getVoteAddress(govID, i)
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

      var dbData = await axios.get(
        "http://13.125.93.131/api/v1/vote/" + govID + "/" + voteObj["id"]
      );
      voteObj["title"] = dbData.data.data.title;
      voteObj["content"] = dbData.data.data.content;

      voteObj["type"] = "vote";
      voteObj["created"] = await oneVoteContract.getCreated();
      voteObj["deadline"] = await oneVoteContract.getDeadline();
      voteObj["deadline"] = voteObj["deadline"].toNumber();

      voteObj["isOption"] = await oneVoteContract.isOption();
      var tempVoteStatus = await oneVoteContract.voteStatus();
      voteObj["status"] = [...tempVoteStatus];
      var temp = 0;
      for (i = 0; i < voteObj["status"].length; i++) {
        voteObj["status"][i] = voteObj["status"][i].toNumber();
        temp += voteObj["status"][i];
      }

      voteObj["totalCount"] = temp;
      voteObj["agreePercent"] = parseInt((voteObj["status"][0] / temp) * 100);
      if (temp == 0) voteObj["agreePercent"] = 0;

      voteObj["agreeNum"] = voteObj["status"][0];
      // voteObj["isEnable"] = await oneVoteContract.isEnable();
      voteObj["isEnable"] = true;
      if (voteObj["isEnable"] == true) {
        voteObj["state"] = "going";
      } else {
        if (voteObj["agreePercent"] >= 50) voteObj["state"] = "adopt";
        else voteObj["state"] = "deny";
      }
      if (voteObj["isEnable"] == false) {
        voteObj["result"] = await oneVoteContract.voteResult();
      }
      voteObj["contract"] = oneVoteContract;

      // console.log(new Date(voteObj["deadline"].toNumber() * 1000));

      if (!voteObj["isOption"]) {
        voteList.push(voteObj);
      }
    }

    return voteList;
  },

  async getProposalInfo({ getters }, govID) {
    console.log(getters.getProposalFactoryContract);
    const proposalCount =
      await getters.getProposalFactoryContract.getProposalCount(govID);
    var proposalAdressList = [];
    // console.log(getters.getProposalFactoryContract);
    for (var i = 0; i < proposalCount; i++) {
      proposalAdressList.push(
        await getters.getProposalFactoryContract.getProposalAddress(govID, i)
      );
    }
    var proposalList = [];
    for (i of proposalAdressList) {
      var oneProposalContract = new ethers.Contract(
        i,
        proposalContractABI,
        getters.getSigner
      );
      var proposalObj = {};

      proposalObj["id"] = await oneProposalContract
        .getProposalID()
        .then((value) => {
          return value.toNumber();
        });

      proposalObj["title"] = "tempTitle";
      var dbData = await axios.get(
        "http://13.125.93.131/api/v1/proposal/" +
          govID +
          "/" +
          proposalObj["id"]
      );
      if (dbData.data.data == null) {
        dbData.data.data = {
          title: "제목입니다.",
          content: "내용입니다.",
        };
      }
      proposalObj["title"] = dbData.data.data.title;
      proposalObj["content"] = dbData.data.data.content;

      proposalObj["type"] = "proposal";
      proposalObj["created"] = await oneProposalContract.getCreated();
      proposalObj["deadline"] = await oneProposalContract.getDeadline();
      proposalObj["deadline"] = proposalObj["deadline"].toNumber();

      var tempProposalStatus = await oneProposalContract.voteStatus();
      proposalObj["status"] = [...tempProposalStatus];
      var temp = 0;
      for (i = 0; i < proposalObj["status"].length; i++) {
        proposalObj["status"][i] = proposalObj["status"][i].toNumber();
        temp += proposalObj["status"][i];
      }

      proposalObj["totalCount"] = temp;
      proposalObj["agreePercent"] = parseInt(
        (proposalObj["status"][0] / temp) * 100
      );
      if (temp == 0) proposalObj["agreePercent"] = 0;

      proposalObj["agreeNum"] = proposalObj["status"][0];
      proposalObj["isEnable"] = await oneProposalContract.isEnable();
      if (proposalObj["isEnable"] == true) {
        proposalObj["state"] = "going";
      } else {
        if (proposalObj["agreePercent"] >= 50) proposalObj["state"] = "adopt";
        else proposalObj["state"] = "deny";
      }

      if (proposalObj["isEnable"] == false) {
        proposalObj["proposalResult"] =
          await oneProposalContract.proposalResult();
      }
      proposalObj["contract"] = oneProposalContract;

      // console.log(new Date(proposalObj["deadline"].toNumber() * 1000));

      if (!proposalObj["isOption"]) {
        proposalList.push(proposalObj);
      }
    }

    return proposalList;
  },

  async getFundingInfo({ getters }, govID) {
    // console.log(getters.getFundingFactoryContract, "funding");
    const fundingCount =
      await getters.getFundingFactoryContract.getFundingCount(govID);
    var fundingAdressList = [];
    // console.log(getters.getFundingFactoryContract);
    for (var i = 0; i < fundingCount; i++) {
      fundingAdressList.push(
        await getters.getFundingFactoryContract.getFundingAddress(govID, i)
      );
    }
    var fundingList = [];
    for (i of fundingAdressList) {
      var oneFundingContract = new ethers.Contract(
        i,
        fundingContractABI,
        getters.getSigner
      );
      var fundingObj = {};

      fundingObj["id"] = await oneFundingContract
        .getFundingID()
        .then((value) => {
          return value.toNumber();
        });

      var dbData = await axios.get(
        "http://13.125.93.131/api/v1/funding/" + govID + "/" + fundingObj["id"]
      );
      if (dbData.data.data == null) {
        dbData.data.data = {
          title: "제목입니다.",
          content: "내용입니다.",
        };
      }
      fundingObj["title"] = dbData.data.data.title;
      fundingObj["content"] = dbData.data.data.content;

      fundingObj["type"] = "funding";
      fundingObj["created"] = await oneFundingContract.getCreated();
      fundingObj["deadline"] = await oneFundingContract.getDeadline();
      fundingObj["deadline"] = fundingObj["deadline"].toNumber();

      var tempFundingStatus = await oneFundingContract.voteStatus();
      fundingObj["status"] = [...tempFundingStatus];
      var temp = 0;
      for (i = 0; i < fundingObj["status"].length; i++) {
        fundingObj["status"][i] = fundingObj["status"][i].toNumber();
        temp += fundingObj["status"][i];
      }

      fundingObj["totalCount"] = temp;
      fundingObj["agreePercent"] = parseInt(
        (fundingObj["status"][0] / temp) * 100
      );
      if (temp == 0) fundingObj["agreePercent"] = 0;
      fundingObj["agreeNum"] = fundingObj["status"][0];
      fundingObj["isEnable"] = await oneFundingContract.isEnable();
      if (fundingObj["isEnable"] == true) {
        fundingObj["state"] = "going";
      } else {
        if (fundingObj["agreePercent"] >= 50) fundingObj["state"] = "adopt";
        else fundingObj["state"] = "deny";
      }
      if (fundingObj["isEnable"] == false) {
        fundingObj["result"] = await oneFundingContract.fundingResult();
      }
      fundingObj["contract"] = oneFundingContract;

      // console.log(new Date(fundingObj["deadline"].toNumber() * 1000));

      if (!fundingObj["isOption"]) {
        fundingList.push(fundingObj);
      }
    }

    return fundingList;
  },

  async getGovInfo({ commit, getters, dispatch }) {
    var govAdressList = getters.getGovAdressList;
    var govDict = {};
    var govIDList = [];
    var sortList = [];
    console.log(govAdressList);
    for (var i of govAdressList) {
      var oneGovContract = new ethers.Contract(
        i,
        CwrongGovABI,
        getters.getSigner
      );

      // const tempVote = await oneGovContract.createVote(0);
      // await tempVote.wait();
      // console.log(tempVote);
      var govObj = {};
      govObj["contract"] = oneGovContract;
      govObj["id"] = await oneGovContract.getGovID();
      govObj["name"] = await oneGovContract.getGovName();
      govObj["leaderAddress"] = await oneGovContract.getGovLeader();
      govObj["memberCount"] = await oneGovContract.getMemberCount();
      govObj["voteCount"] = await oneGovContract.getVoteCount();

      govObj["proposalCount"] = await oneGovContract.getProposalCount();
      govObj["fundingCount"] = await oneGovContract.getFundingCount();
      govObj["presentBalance"] = await oneGovContract.getPresentBalance();
      govObj["presentBalance"] = govObj["presentBalance"].toNumber();
      console.log(govObj["presentBalance"], "asdf");
      govObj["totalBalance"] = await oneGovContract.getTotalBalance();
      // console.log("wtf");
      govObj["voteList"] = await dispatch("getVoteInfo", govObj["id"]);
      govObj["fundingList"] = await dispatch("getFundingInfo", govObj["id"]);
      govObj["proposalList"] = await dispatch("getProposalInfo", govObj["id"]);

      govObj["allVoteList"] = govObj["voteList"]
        .concat(govObj["fundingList"])
        .concat(govObj["proposalList"]);
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
    commit("setSortGovList", [...sortList]);

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
