import { API } from "../api";

export const SET_WORKERS = "transfers/workers/SET_WORKERS";
const initialState = [];

export const workersReducer = (state = initialState, { type, payload }) => {
  if (type === SET_WORKERS) {
    return payload.workers;
  }

  return state;
};

export const setWorkersAC = (workers) => {
  return {
    type: SET_WORKERS,
    payload: {
      workers,
    },
  };
};

export const loadWorkersThunk = () => {
  return async (dispatch) => {
    try {
      const workers = await API.getWorkers();

      dispatch(setWorkersAC(workers));
    } catch (e) {
      console.log(e);
    }
  };
};
