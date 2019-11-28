import Metaverse from "metaversejs";
import { CREATE_MIT, SENT_MIT } from "./types";
import { issueMIT } from "../BlockchainLogic/MitLogic";

export const createMit = (mnemonic, symbol) => async dispatch => {
  console.log("action called");
  //   console.log(mnemonic, "got the mnemonic");
  await issueMIT(
    "alcohol hammer involve little wide kitten antenna fly census escape front arctic suggest angry affair flag sick pattern potato place page reopen sing mang",
    symbol
  );
  //   dispatch({
  //     type: CREATE_MIT,
  //     payload: [mnemonic, avatar]
  //   });
};
