import Blockchain from "mvs-blockchain";
import Metaverse from "metaversejs";
import {
  CREATE_WALLET_ERR_MESSAGE,
  CREATE_WALLET,
  GET_WALLET_ERR_MESSAGE,
  GET_WALLET
} from "./types";
import { run, generateReceiverWallet } from "../BlockchainLogic/Faucet";
import { convertColorToString } from "material-ui/utils/colorManipulator";

// let blockchain = Blockchain({ url: "https://explorer-testnet.mvs.org/api/" });

// let avatarInfo = await blockchain.avatar.get("tSvWqidQE5tKCCVaucpeECoHvyExq54t2p");
// console.log(avatarInfo);

export const createWallet = (username, password) => async dispatch => {
  run();
  const newMnemonic = await generateReceiverWallet();
  dispatch({
    type: CREATE_WALLET,
    payload: newMnemonic
  });
  // .catch(err => {
  //   dispatch({
  //     type: CREATE_WALLET_ERR_MESSAGE,
  //     payload: err.response.data
  //   });
  // });
};

//LOGIN FUNCTIONALITY

export const getWallet = password => async dispatch => {
  let mnemonic;
  const returningMnemonic = await Metaverse.wallet.fromMnemonic(
    mnemonic,
    "testnet"
  );

  dispatch({
    type: GET_WALLET,
    payload: returningMnemonic
  });
};
