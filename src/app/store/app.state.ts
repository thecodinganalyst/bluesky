import {RouterReducerState} from "@ngrx/router-store";
import {TableDataType} from "./table-data";

export interface AppState {
  feature: FeatureState;
  router: RouterReducerState;
  table: TableState;
}

export interface FeatureState {
  appName: string;
}

export interface TableState {
  data: TableDataType[];
}
