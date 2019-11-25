import axios from "axios";
import { CREATE_WALLET_ERR_MESSAGE } from "./types";
import { CREATE_WALLET } from "./types";

window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
}

var request = window.indexedDB.open("MyTestDatabase", 3);

export const createWallet = (username, password) => dispatch => {
  axios
    // .get(BaseURL + "/prove?hash=" + hash)
    .get(/*PRIVATE_KEY_FROM_INDEXED_DB*/)
    .then(res => {
      dispatch({
        type: "CREATE_WALLET",
        payload: res.data
      });
      console.log(res.data, "createWallet action res.data<<<=======");
    })
    .catch(err => {
      dispatch({
        type: CREATE_WALLET_ERR_MESSAGE,
        payload: err.response.data
      });
    });
};
