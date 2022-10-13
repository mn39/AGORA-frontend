import { ethers } from "ethers";
import tokenContractABI from "../../contracts/abi/AgoraToken.json";
import deployedAddress from "../../contracts/deployedAddress.json";

const state = () => ({
  isConnected: false,
  walletAddress: null,
  walletBalance: 0,
  tokenBalance: 0,
  provider: null,
  signer: null,
  tokenContract: null,
});

const getters = {
  getIsConnected(state) {
    return state.isConnected;
  },
  getWalletAddress(state) {
    return state.walletAddress;
  },
  getWalletBalance(state) {
    return ethers.utils.formatEther(state.walletBalance);
  },
  getWalletBalanceWei(state) {
    return state.walletBalance;
  },
  getWalletBalanceEth(state) {
    return ethers.utils.formatEther(state.walletBalance);
  },
  getTokenBalance(state) {
    return state.tokenBalance;
  },
  getProvider(state) {
    return state.provider;
  },
  getSigner(state) {
    return state.signer;
  },
  getTokenContract(state) {
    return state.tokenContract;
  },
};

const mutations = {
  setIsConnected: function (state, value) {
    state.isConnected = value;
  },
  setWalletAddress: function (state, value) {
    state.walletAddress = value;
  },
  setWalletBalance: function (state, value) {
    state.walletBalance = value;
  },
  setTokenBalance: function (state, value) {
    state.tokenBalance = value;
  },
  setProvider: function (state, value) {
    state.provider = value;
  },
  setSigner: function (state, value) {
    state.signer = value;
  },
  setContracts: function (state) {
    state.tokenContract = new ethers.Contract(
      deployedAddress.AgoraToken,
      tokenContractABI,
      state.signer
    );
  },
};

const actions = {
  async connect({ commit, getters }) {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    commit("setIsConnected", "true");
    commit("setSigner", signer);
    commit("setProvider", provider);

    const address = await signer.getAddress();
    const balance = await signer.getBalance();

    commit("setWalletAddress", address);
    commit("setWalletBalance", balance);

    commit("setContracts");

    const tokenBalance = await getters.getTokenContract.balanceOf(
      getters.getWalletAddress
    );
    commit("setTokenBalance", tokenBalance);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
