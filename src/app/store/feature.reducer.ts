import {createReducer, on} from "@ngrx/store";
import {AppActions} from "./app.actions";
import {FeatureState} from "./app.state";

export const initialState = { appName: "Blue Sky", message: "" }

export const featureReducer = createReducer(
  initialState,
  on(AppActions.messageShowWarning, (state, {message}): FeatureState => ({...state, message: message}))
);
