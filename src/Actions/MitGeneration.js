import Metaverse from "metaversejs";
import { CREATE_MIT, SENT_MIT } from "./types";
import { initialize } from "../BlockchainLogic/MitLogic";

export const createMit = () => async dispatch => {
  const [mnemonic, avatar] = await run();
  initialize();
  dispatch({
    type: CREATE_MIT,
    payload: [mnemonic, avatar]
  });
};
