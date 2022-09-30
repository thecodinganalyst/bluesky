import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { FormComponent } from './form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {StoreModule} from "@ngrx/store";
import {featureReducer} from "../store/feature.reducer";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {formReducer, initialState} from "../store/form.reducer";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {AppRoutingModule} from "../app-routing.module";
import {MatFormFieldHarness} from "@angular/material/form-field/testing";
import {MatInputHarness} from "@angular/material/input/testing";
import {MatSelectHarness} from "@angular/material/select/testing";
import {countries} from "../store/country-list";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonHarness} from "@angular/material/button/testing";

function sortFn(a: number | undefined, b: number | undefined): number {
  if(a === undefined && b === undefined) return 0
  if(a === undefined && b !== undefined) return 1
  if(a !== undefined && b === undefined) return -1
  return a! - b!
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        AppRoutingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        StoreModule.forRoot({feature: featureReducer, router: routerReducer, form: formReducer}),
        StoreRouterConnectingModule.forRoot(),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show all controls as prescribed', async () => {
    let names = initialState.controls.map(ctl => ctl.name);
    let controls = fixture.debugElement.queryAll(ele => ele.name == 'mat-form-field');
    expect(controls.length).toBe(names.length);
  });

  it('should show correct control type for controls', async () => {
    for(let ctl of initialState.controls){
      let matFormField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: ctl.label + (ctl.required ? " *" : "")}))
      expect(matFormField).toBeTruthy();
      let actualCtl = await matFormField.getControl();
      if(ctl.controlType == 'textbox' || ctl.controlType == 'textarea'){
        let isTextBox = actualCtl instanceof MatInputHarness;
        expect(isTextBox).toBeTrue();
      }else if(ctl.controlType == 'dropdown'){
        let isDropdown = actualCtl instanceof MatSelectHarness;
        expect(isDropdown).toBeTrue();
      }
    }
  });

  it('should display the controls in the order specified', async () => {
    let ordered = [...initialState.controls].sort((a, b) => sortFn(a.order, b.order));
    let fields = await loader.getAllHarnesses(MatFormFieldHarness);
    for(let i = 0; i < fields.length; i ++){
      let label = await fields[i].getLabel()
      expect(label).toBe(ordered[i].label + (ordered[i].required ? " *" : ""))
    }
  });

  it('should display the options for the select', async () => {
    let field = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Country *'}))
    let select = await field.getControl() as MatSelectHarness;
    expect(select).toBeTruthy();
    await select.open();
    let options = await select.getOptions();
    expect(options.length).toBe(countries.length);
  });

  it('submit button should be disabled if the data in the form is not complete', async () => {
    let submitButton = await loader.getHarness(MatButtonHarness.with({text: 'Submit'}))
    expect(submitButton).toBeTruthy();
    expect(await submitButton.isDisabled()).toBeTrue();
    let inputs = await loader.getAllHarnesses(MatInputHarness)
    for (const input of inputs) {
      await input.setValue("something")
    }
    let selects = await loader.getAllHarnesses(MatSelectHarness)
    for (const select of selects){
      await select.clickOptions()
    }
    expect(await submitButton.isDisabled()).toBeFalse()
  });

});
