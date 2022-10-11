import {RouterReducerState} from "@ngrx/router-store";
import {TableState} from "./table/table.state";
import {FormState} from "./form/form.state";
import {Route} from "@angular/router";

export interface AppState {
  feature: FeatureState;
  navigation: Route;
  router: RouterReducerState;
  table: TableState;
  form: FormState;
}

export interface FeatureState {
  appName: string;
  message: string;
}

export type MessagePayload = {
  message: string;
}
