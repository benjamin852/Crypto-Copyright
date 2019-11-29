import {
  STORE,
  PROVE,
  DOWNLOAD,
  CREATE_WALLET,
  GET_WALLET,
  AUTHENTICATION,
  CREATE_ACCOUNT,
  GET_MITS
} from "../Actions/types";

const state = {
  successMsg: "",
  proveSuccessMsg: "", //renders verify page either for URL or to set hash
  downloadSuccessMsg: "",
  avatar: "",
  mnemonic: "",
  mits: [],
  loggedIn: false,
  account: null
};

function ProveitReducer(mState = { ...state }, action) {
  switch (action.type) {
    case STORE:
      if (action.payload === undefined || action.payload === null) {
      } else {
        console.log(action.payload, "CASE Store action.payload");
        mState.successMsg = action.payload;
      }
      return deepCopy(mState);

    case PROVE:
      if (action.payload === undefined || action.payload === null) {
      } else {
        console.log(action.payload, "CASE Prove action.payload");
        mState.proveSuccessMsg = action.payload;
      }
      return deepCopy(mState);

    case DOWNLOAD:
      if (action.payload === undefined || action.payload === null) {
      } else {
        console.log(action.payload, "CASE Download action.payload");
        mState.downloadSuccessMsg = action.payload;
      }
      return deepCopy(mState);
    case CREATE_WALLET:
      if (action.payload === undefined || action.payload === null) {
      } else {
        console.log(action.payload, "action.payload<<<===");
        mState.mnemonic = action.payload[0];
        mState.avatar = action.payload[1];
      }
      return deepCopy(mState);
    case GET_WALLET:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.mnemonic = action.payload;
      }
      return deepCopy(mState);
    case AUTHENTICATION:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.loggedIn = action.payload;
      }
      return deepCopy(mState);
    case CREATE_ACCOUNT:
      if (action.payload === undefined) {
      } else {
        mState.account = action.payload;
      }
      return deepCopy(mState);
    case GET_MITS:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.mits = action.payload;
      }
      return deepCopy(mState);
    default:
      return deepCopy(mState);
  }
}

const deepCopy = obj => {
  const newObj = JSON.parse(JSON.stringify(obj));
  return newObj;
};
export default ProveitReducer;
