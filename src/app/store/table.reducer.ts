import {createReducer} from "@ngrx/store";
import {TableData} from "./table-data";

export const initialState = { data: TableData }

export const tableReducer = createReducer(initialState);
