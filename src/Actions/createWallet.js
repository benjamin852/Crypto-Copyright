import axios from "axios";
import { CREATE_WALLET_ERR_MESSAGE, CREATE_WALLET } from "./types";
import { run, generateReceiverWallet } from "../BlockchainLogic/Faucet";
import { keyString256, aesEncrypt } from "../utils/creepto";
import * as idb from "idb"

export const createWallet = (username, password) => async dispatch => {
  run();
  const mnemonic = await generateReceiverWallet();
  
  let passHash = keyString256(password);
  const key  = passHash.key;
  const salt = passHash.salt;
  let decryptedHash = aesEncrypt(key,mnemonic)

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
