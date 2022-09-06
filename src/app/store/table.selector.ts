import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TableState} from "./app.state";

const selectTable = createFeatureSelector<TableState>("table")
const data = createSelector(selectTable, table => table.data)

export const tableSelector = { data }
