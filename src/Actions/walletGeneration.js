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
import { convertColorToString } from "material-ui/utils/colorManipulator";
import { keyString256, aesEncrypt, aesDecrypt } from "../utils/creepto";
import { addItem, getItem } from "../utils/idb";

// let blockchain = Blockchain({ url: "https://explorer-testnet.mvs.org/api/" });

const blockchain = Blockchain({ url: "https://explorer-testnet.mvs.org/api/" });

export const createWallet = (username, password) => async dispatch => {
  const [mnemonic, avatar] = await run();
  console.log(mnemonic, "mnemonic in action");
  console.log(avatar, "avatar in action");

  let passHash = keyString256(password);
  const key = passHash.key;
  const salt = passHash.salt;
  let encryptedHash = aesEncrypt(key, mnemonic);

  let secret = {
    salt: salt,
    accoutnInfo: encryptedHash
  };

  await addItem([secret, true], ["secret", "loggedIn"]);


  
  dispatch({
    type: CREATE_WALLET,
    payload: [mnemonic, avatar]
  });
};

export const getWallet = password => async dispatch => {
  console.log(password)
  let mnemonic;
  let { salt, accoutnInfo } = await getItem("secret");
  let key = keyString256(password, salt).key;
  console.log(key)
  let decryptedMnemonic = aesDecrypt(key, accoutnInfo);
  if (accoutnInfo === aesEncrypt(key, decryptedMnemonic)) {
    mnemonic = decryptedMnemonic;
    console.log(mnemonic)
  } else {
    console.error("WRONG PASSWORD");
  }

  const returningMnemonic = await Metaverse.wallet.fromMnemonic(
    mnemonic, //mnemonic should already be stored in indexdb
    "testnet"
  );
  dispatch({
    type: GET_WALLET,
    payload: returningMnemonic
  });
};
