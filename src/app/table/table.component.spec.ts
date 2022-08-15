import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from './table.component';
import {AppRoutingModule} from "../app-routing.module";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatCheckboxHarness} from "@angular/material/checkbox/testing";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        AppRoutingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture)
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show checkbox when showCheckbox is enabled', async () => {
    component.showCheckbox = true;
    component.ngAfterViewInit();
    fixture.detectChanges();
    let checkBoxes = await loader.getAllHarnesses(MatCheckboxHarness);
    expect(checkBoxes.length).toBeGreaterThan(0);
  })

  it('should allow multiple selection when allowMultipleSelection is enabled', async () => {
    component.showCheckbox = true;
    component.allowMultipleSelection = true;
    component.ngAfterViewInit();
    fixture.detectChanges();
    component.toggleAllRows();
    let checkBoxes = await loader.getAllHarnesses(MatCheckboxHarness);
    for (const checkBox of checkBoxes) {
      expect(await checkBox.isChecked()).toBeTrue();
    }
    expect(component.isAllSelected()).toBeTrue();
  })

  it('should not allow multiple selection when allowMultipleSelection is disabled', async () => {
    component.showCheckbox = true;
    component.allowMultipleSelection = false;
    component.ngAfterViewInit();
    fixture.detectChanges();
    component.toggleAllRows();
    let checkBoxes = await loader.getAllHarnesses(MatCheckboxHarness);
    for (const checkBox of checkBoxes) {
      expect(await checkBox.isChecked()).toBeFalse();
    }
    expect(component.isAllSelected()).toBeFalse();
  })


});
