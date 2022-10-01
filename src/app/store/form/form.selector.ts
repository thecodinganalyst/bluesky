import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FormState} from "../app.state";

const selectForm = createFeatureSelector<FormState>("form")
const title = createSelector(selectForm, form => form.title)
const controls = createSelector(selectForm, form => form.controls)
const actionButtons = createSelector(selectForm, form => form.actionButtons)

export const formSelector = { title, controls, actionButtons }
