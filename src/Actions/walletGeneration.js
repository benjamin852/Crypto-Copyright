import Metaverse from "metaversejs";
import { CREATE_WALLET, GET_WALLET } from "./types";

export const createWallet = (mnemonic, avatar) => async dispatch => {
  dispatch({
    type: CREATE_WALLET,
    payload: [mnemonic, avatar]
  });
};

export const getWallet = mnemonic => async dispatch => {
  console.log(mnemonic);
  await Metaverse.wallet.fromMnemonic(
    mnemonic, //mnemonic should already be stored in indexdb
    "testnet"
  );

  dispatch({
    type: GET_WALLET,
    payload: mnemonic
  });
};
