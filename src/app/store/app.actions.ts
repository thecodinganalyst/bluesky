import {Actions} from "./ActionMap";
import {MessagePayload} from "./app.state";
import {props} from "@ngrx/store";
import {FormActions} from "./form/form.actions";

const messageShowWarning = Actions.registerActionWithProps("[Message] Show warning", props<MessagePayload>())

export const AppActions = {
  messageShowWarning, FormActions
}

