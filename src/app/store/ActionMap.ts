import {ActionCreator, ActionCreatorProps, createAction} from "@ngrx/store";
import {NotAllowedCheck, TypedAction} from "@ngrx/store/src/models";

export class ActionMap {
  data = new Map<string, any>();

  registerAction(name: string): ActionCreator<string, () => TypedAction<string>> {
    if(this.data.has(name)) throw "Action name not available";
    const act = createAction(name)
    this.data.set(name, act)
    return act;
  }

  registerActionWithProps<P extends object>(name: string, payload: ActionCreatorProps<P> & NotAllowedCheck<P>): ActionCreator<string, (props: P & NotAllowedCheck<P>) => P & TypedAction<string>> {
    if(this.data.has(name)) throw "Action name not available";
    const act = createAction(name, payload)
    this.data.set(name, act)
    return act;
  }

  retrieveAction(name: string): ActionCreator<string, () => TypedAction<string>> {
    if(!this.data.has(name)) throw "Action name cannot be found";
    return this.data.get(name);
  }
}

export const Actions = new ActionMap()
