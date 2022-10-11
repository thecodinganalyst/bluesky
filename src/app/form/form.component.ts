import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {ActionButton, Control} from "../store/form/control";
import {formSelector} from "../store/form/form.selector";
import {Actions} from "../store/ActionMap";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  formGroup: FormGroup = new FormGroup<any>({})
  formTitle?: string
  controls: Array<Control> = []
  actionButtons: Array<ActionButton> = []

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
    this.store.select(formSelector.title).subscribe(title => this.formTitle = title)
    this.store.select(formSelector.controls).subscribe(controls => {
      this.controls = [...controls].sort((a, b) => this.sortFn(a.order, b.order))
      this.formGroup = this.fb.group(this.getFormGroup(this.controls))
    })
    this.store.select(formSelector.actionButtons).subscribe(actionButtons => {
      this.actionButtons = [...actionButtons].sort((a, b) => this.sortFn(a.order, b.order))
    })
  }

  getFormGroup(controls: Control[]): {[key: string]: FormControl} {
    const frmCtlDict: {[key: string]: FormControl} = {}
    controls.forEach((ctl) => {
      frmCtlDict[ctl.name] = new FormControl(ctl.value, ctl.required ? Validators.required : null);
    })
    return frmCtlDict;
  }

  sortFn(a: number | undefined, b: number | undefined): number {
    if(a === undefined && b === undefined) return 0
    if(a === undefined && b !== undefined) return 1
    if(a !== undefined && b === undefined) return -1
    return a! - b!
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
