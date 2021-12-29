import { ADD_DOC, DELETE_DOC, SET_DOCS } from "../actions/docs";

const initialState = {
  docs: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DOC:
      return { docs: [payload, ...state.docs] };
    case DELETE_DOC:
      return { docs: state.docs.filter((doc) => doc.id !== payload.id) };
    case SET_DOCS:
      return { docs: [...payload] };
    default:
      return state;
  }
};
