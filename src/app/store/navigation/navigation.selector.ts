import {createFeatureSelector, createSelector} from "@ngrx/store";
import {NavigationState} from "./navigation.state";

const selectNavigation = createFeatureSelector<NavigationState>("navigation");

const menu = createSelector(selectNavigation, navigation => navigation.menu);

export const navigationSelector = { menu }
