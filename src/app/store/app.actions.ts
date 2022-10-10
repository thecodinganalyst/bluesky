import {Actions} from "./ActionMap";
import {MessagePayload} from "./app.state";
import {props} from "@ngrx/store";
import {FormActions} from "./form/form.actions";

const messageShowWarning = Actions.registerActionWithProps("[Message] Show warning", props<MessagePayload>())

const navigationBack = Actions.registerAction("[Navigation] Back")

export const AppActions = {
  messageShowWarning, navigationBack, FormActions
}

