import {RouterReducerState} from "@ngrx/router-store";
import {TableDataType} from "./table-data";
import {Control} from "./control";

export interface AppState {
  feature: FeatureState;
  router: RouterReducerState;
  table: TableState;
  form: FormState;
}

export interface FeatureState {
  appName: string;
}

export interface TableState {
  data: TableDataType[];
}

export interface FormState {
  title: string;
  controls: Control[];
}
