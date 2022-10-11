import {createReducer, on} from "@ngrx/store";
import {AppActions} from "./app.actions";

export const initialState = { appName: "Blue Sky", message: "" }

export const featureReducer = createReducer(
  initialState,
  on(AppActions.messageShowWarning, (state, {message}) => ({...state, message: message}))
);
