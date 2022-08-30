import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FeatureState} from "./app.state";

export const featureSelector = createFeatureSelector<FeatureState>("feature")
export const appNameSelector = createSelector(featureSelector, (feature) => feature.appName);
