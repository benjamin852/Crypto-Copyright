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
import { keyString256, aesEncrypt } from "../utils/creepto";
import * as idb from "idb"

// let blockchain = Blockchain({ url: "https://explorer-testnet.mvs.org/api/" });

// let avatarInfo = await blockchain.avatar.get("tSvWqidQE5tKCCVaucpeECoHvyExq54t2p");
// console.log(avatarInfo);

export const createWallet = (username, password) => async dispatch => {
  run();
  const newMnemonic = await generateReceiverWallet();

  let passHash = keyString256(password);
  const key  = passHash.key;
  const salt = passHash.salt;
  let decryptedHash = aesEncrypt(key,newMnemonic)

  let secret = {
    salt : salt,
    accoutnInfo : decryptedHash
  }
  console.log(secret)
  let db = await idb.openDB('mvs', 1, {
    upgrade(db) {
      db.createObjectStore('wallet');
    }
  });

  await db.add("wallet", secret,"secret")
  dispatch({
    type: CREATE_WALLET,
    payload: newMnemonic
  });

};
