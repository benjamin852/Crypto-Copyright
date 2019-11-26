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
  getAvatar
} from "../BlockchainLogic/Faucet";

const blockchain = Blockchain({ url: "https://explorer-testnet.mvs.org/api/" });

export const createWallet = (username, password) => async dispatch => {
  const [newMnemonic, address] = await run();
  //^working
  const avatar = await getAvatar(address);
  console.log(avatar, "<<==== avatar");
  dispatch({
    type: CREATE_WALLET,
    payload: [newMnemonic, avatar]
  });
};

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
