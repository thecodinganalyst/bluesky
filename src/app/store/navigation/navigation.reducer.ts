import navigation from "../../../assets/application/navigation.json"
import {createReducer} from "@ngrx/store";

export const initialState = navigation

export const navigationReducer = createReducer(initialState)

