import axios from "axios";
import { CREATE_WALLET_ERR_MESSAGE, CREATE_WALLET } from "./types";
import { run, generateReceiverWallet } from "../BlockchainLogic/Faucet";

export const createWallet = username => async dispatch => {
  run();
  const mnemonic = await generateReceiverWallet();
  console.log(mnemonic);
  axios
    // .get(`https://explorer-testnet.mvs.org/avatar/${username}`) //coors<-- error
    .get(`https://proveit-muffins.firebaseapp.com/api/prove?hash${username}`)
    .then(res => {
      dispatch({
        type: CREATE_WALLET,
        payload: res.data
      });
    });
  // .catch(err => {
  //   dispatch({
  //     type: CREATE_WALLET_ERR_MESSAGE,
  //     payload: err.response.data
  //   });
  // });
};
