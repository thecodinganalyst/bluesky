import {RouterReducerState} from "@ngrx/router-store";

export interface AppState {
  feature: FeatureState;
  router: RouterReducerState;
}

export interface FeatureState {
  appName: string;
}
