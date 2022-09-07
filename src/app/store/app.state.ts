import {RouterReducerState} from "@ngrx/router-store";
import {TableDataType} from "./table-data";
import {Country} from "country-list";
import {ControlTextbox} from "./control-textbox";
import {ControlDropdown} from "./control-dropdown";

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
  definition: FormDefinition;
}

export interface FormDefinition {
  givenName: ControlTextbox;
  surName: ControlTextbox;
  contactNo: ControlTextbox;
  email: ControlTextbox;
  address: Address;
  message: ControlTextbox;
}

export interface Address {
  street: ControlTextbox;
  block: ControlTextbox;
  unit: ControlTextbox;
  city: ControlTextbox;
  state?: ControlTextbox;
  country: ControlDropdown;
  postalCode: ControlTextbox;
}
