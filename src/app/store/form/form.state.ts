import {ActionButton, Control} from "./control";

export interface FormState {
  title: string;
  controls: Control[];
  actionButtons: ActionButton[];
}
