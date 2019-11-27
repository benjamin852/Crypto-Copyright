import { STORE, PROVE, DOWNLOAD, CREATE_WALLET } from "../Actions/types";

const state = {
  successMsg: "",
  proveSuccessMsg: "", //renders verify page either for URL or to set hash
  downloadSuccessMsg: "",
  avatar: "",
  mnemonic: "",
  mits: []
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
        console.log(action.payload, "CASE  Prove action.payload");
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
    default:
      return deepCopy(mState);
  }
}

const deepCopy = obj => {
  const newObj = JSON.parse(JSON.stringify(obj));
  return newObj;
};
export default ProveitReducer;
