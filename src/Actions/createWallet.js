import axios from "axios";
import { CREATE_WALLET_ERR_MESSAGE, CREATE_WALLET } from "./types";
import { run, generateReceiverWallet } from "../BlockchainLogic/Faucet";

export const createWallet = username => async dispatch => {
  run();
  const mnemonic = await generateReceiverWallet();
  // axios.get(`https://explorer-testnet.mvs.org/avatar/${username}`).then(res => {
  //   dispatch({
  //     type: CREATE_WALLET,
  //     payload: res.data
  //   });
  //   console.log(res.data, "createWallet action res.data<<<=======");
  // });
  // .catch(err => {
  //   dispatch({
  //     type: CREATE_WALLET_ERR_MESSAGE,
  //     payload: err.response.data
  //   });
  // });
};
