import Blockchain from "mvs-blockchain";
import Metaverse from "metaversejs";
import {
  CREATE_WALLET_ERR_MESSAGE,
  CREATE_WALLET,
  GET_WALLET_ERR_MESSAGE,
  GET_WALLET
} from "./types";
import {
  run,
  generateReceiverWallet,
  registerAvatar
} from "../BlockchainLogic/Faucet";

export const createWallet = password => async dispatch => {
  const [mnemonic, avatar] = await run();
  console.log(mnemonic, "mnemonic in action");
  console.log(avatar, "avatar in action");
  dispatch({
    type: CREATE_WALLET,
    payload: [mnemonic, avatar]
  });
};

export const getWallet = password => async dispatch => {
  let mnemonic;
  const returningMnemonic = await Metaverse.wallet.fromMnemonic(
    mnemonic, //mnemonic should already be stored in indexdb
    "testnet"
  );
  dispatch({
    type: GET_WALLET,
    payload: returningMnemonic
  });
};
