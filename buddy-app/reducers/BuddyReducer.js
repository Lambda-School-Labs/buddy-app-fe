import {
  ADD_TOKEN,
  ADD_USER,
  IS_LOADING,
  ADD_INTEREST
} from "../actions/buddyActions";
const initialState = {
  token: null,
  user: {
    first_name: "",
    last_name: "",
    id: "",
    interests: []
  },
  isLoading: false
};

export const buddyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN: {
      return {
        ...state,
        token: action.payload
      };
    }
    case ADD_USER: {
      return {
        ...state,
        user: { ...action.payload, interests: [...state.user.interests] }
      };
    }

    case ADD_INTEREST: {
      return {
        ...state,
        user: {
          ...state.user,
          interests: [...state.user.interests, action.payload]
        }
      };
    }

    case IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    default:
      return state;
  }
};
