import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FormState} from "./app.state";

const selectForm = createFeatureSelector<FormState>("form")
const definition = createSelector(selectForm, form => form.definition)

export const formSelector = { definition }
