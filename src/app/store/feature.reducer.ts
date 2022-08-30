import {createReducer} from "@ngrx/store";

export const initialState = { appName: "Blue Sky" }

export const featureReducer = createReducer(initialState);
