import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FormState} from "./form.state";
import {sortNumericUndefined} from "../../util/sort";

const selectForm = createFeatureSelector<FormState>("form")
const selectFormTitle = createSelector(selectForm, form => form.title)
const selectFormControls = createSelector(selectForm, form => [...form.controls].sort((a, b) => sortNumericUndefined(a.order, b.order)))
const selectFormActionButtons = createSelector(selectForm, form => [...form.actionButtons].sort((a, b) => sortNumericUndefined(a.order, b.order)))

export const formSelector = { title: selectFormTitle, controls: selectFormControls, actionButtons: selectFormActionButtons }
