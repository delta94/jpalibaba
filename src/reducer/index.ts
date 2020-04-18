import { combineReducers } from "redux";

export interface UserState {
  firstName: string;
  lastName: string;
}

export interface AuthenticationState {
  role: string;
  token: string;
}

export interface ModalState {
  isOpen: boolean;
}

export interface AppState {
  user: UserState;
  authentication: AuthenticationState;
  modal: ModalState;
}

const modal = (state = {}, action: any) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, ...{ isOpen: true } };
    case "HIDE_MODAL":
      return { ...state, ...{ isOpen: false } };
    default:
      return state;
  }
};

const user = (state = {}, action: any) => {
  switch (action.type) {
    case "AUTHENTICATE_SUCCESS":
      const {
        payload: { user },
      } = action;
      return { ...state, ...user };
    default:
      return state;
  }
};

const authentication = (state = {}, action: any) => {
  switch (action.type) {
    case "AUTHENTICATE_SUCCESS":
      const {
        payload: { role, token },
      } = action;
      return { ...state, ...{ role, token } };
    default:
      return state;
  }
};

const appReducer = combineReducers({ user, authentication, modal });

const initialState = { user: {}, authentication: {}, modal: { isOpen: false } };

const rootReducer = (state = initialState, action: any) => {
  if (action.type === "LOGOUT") {
    state = initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
