import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {ActionButton, Control} from "../store/form/control";
import {formSelector} from "../store/form/form.selector";
import {Actions} from "../store/ActionMap";
import {EMPTY, first, Observable} from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  formGroup: FormGroup = new FormGroup<any>({})
  formTitle$: Observable<string> | undefined
  controls: Array<Control> = []
  actionButtons$: Observable<Array<ActionButton>> = EMPTY

  constructor(private fb: FormBuilder, private store: Store) {}

  buttonClicked(action: string): void {
    if(action){
      try{
        this.store.dispatch(Actions.retrieveAction(action)());
      }catch (e){
        console.log(e)
      }
    }
  }

  formSubmit(): void {
    alert(JSON.stringify(this.formGroup.value))
  }

  ngOnInit(): void {
    this.formTitle$ = this.store.select(formSelector.title)
    this.store.select(formSelector.controls).pipe(first()).subscribe(controls => {
      this.controls = controls
      this.formGroup = this.fb.group(this.getFormGroup(this.controls))
    })
    this.actionButtons$ = this.store.select(formSelector.actionButtons)
  }

  getFormGroup(controls: Control[]): {[key: string]: FormControl} {
    const frmCtlDict: {[key: string]: FormControl} = {}
    controls.forEach((ctl) => {
      frmCtlDict[ctl.name] = new FormControl(ctl.value, ctl.required ? Validators.required : null);
    })
    return frmCtlDict;
  }

  calcTextAreaRow(width: string | undefined): number{
    if(width === undefined) return 3
    if(!isNaN(Number(width))) return +width
    let value = width.trim()
    if(value.substring(value.length - 1) == "%"){
      value = value.substring(0, value.length - 1)
      return +value / 100;
    }
    return 3;
  }
}
