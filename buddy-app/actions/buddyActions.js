export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USER = "ADD_USER";
export const IS_LOADING = "IS_LOADING";

export const addToken = token => {
  return { type: ADD_TOKEN, payload: token };
};

export const addUser = user => {
  return { type: ADD_USER, payload: user };
};

export const isLoadingPage = value => {
  return { type: IS_LOADING, payload: value };
};
