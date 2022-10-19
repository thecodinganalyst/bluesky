import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FeatureState} from "./app.state";

export const selectFeature = createFeatureSelector<FeatureState>("feature")
export const selectFeatureAppName = createSelector(selectFeature, (feature) => feature.appName);
