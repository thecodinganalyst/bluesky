import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AppActions} from "./app.actions";
import {Location} from "@angular/common";
import {tap} from "rxjs";

@Injectable()
export class AppEffects{

  constructor(private actions$: Actions, private location: Location) {
  }

  navigateBack$ = createEffect(
    () => { return this.actions$.pipe(
      ofType(AppActions.navigationBack),
      tap(() => this.location.back())
    ) },
    {dispatch: false}
  )
}
