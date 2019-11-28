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
import { keyString256, aesEncrypt } from "../utils/creepto";
import { addItem } from "../utils/idb";

// let blockchain = Blockchain({ url: "https://explorer-testnet.mvs.org/api/" });

export const createWallet = (password, username) => async dispatch => {
  const [mnemonic, avatar] = await run();

  console.log(mnemonic, "mnemonic in action");
  console.log(avatar, "avatar in action");
  // let avatar = "godofwar";
  // let mnemonic ="alcohol hammer involve little wide kitten antenna fly census escape front arctic suggest angry affair flag sick pattern potato place page reopen sing mango";
  console.log(12, password);
  let passHash = keyString256(password);
  const key = passHash.key;
  const salt = passHash.salt;
  let encryptedHash = aesEncrypt(key, mnemonic);

  let secret = {
    avatar: username,
    salt: salt,
    walletInfo: encryptedHash
  };

  await addItem([secret, true], ["accountInfo", "loggedIn"]);

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

const getMits = () => {};
