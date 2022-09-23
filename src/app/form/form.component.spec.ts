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
import {formReducer} from "../store/form.reducer";
import {MatInputHarness} from "@angular/material/input/testing";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {AppRoutingModule} from "../app-routing.module";

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

  it('should show textbox for family name and given name', async ()=> {
    let textboxes = await loader.getAllHarnesses(MatInputHarness.with({selector: "[name='givenName']"}))
    expect(textboxes.length).toBeGreaterThan(2)

  });
});
