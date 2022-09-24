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
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableHarness} from "@angular/material/table/testing";
import {MatSortHeaderHarness} from "@angular/material/sort/testing";
import {MatIconModule} from "@angular/material/icon";
import {MatIconHarness} from "@angular/material/icon/testing";
import {MatButtonHarness} from "@angular/material/button/testing";
import {MatInputHarness} from "@angular/material/input/testing";
import {tableReducer} from "../store/table.reducer";
import {StoreModule} from "@ngrx/store";
import {featureReducer} from "../store/feature.reducer";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        AppRoutingModule,
        StoreModule.forRoot({feature: featureReducer, router: routerReducer, table: tableReducer}),
        StoreRouterConnectingModule.forRoot(),
      ],
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

  it('should be able to sort ascendingly and descendingly', async () => {
    const col = 1;
    let headerCells = await loader.getAllHarnesses(MatSortHeaderHarness);
    await headerCells[col].click();
    fixture.detectChanges();
    let direction = await headerCells[1].getSortDirection();
    let table = await loader.getHarness(MatTableHarness);
    let data = await table.getCellTextByIndex();
    let colData = data.map(row => row[col]);
    expect(direction).toEqual("asc");
    for(let i = 1; i < colData.length; i ++){
      expect(colData[i] >= colData[i - 1]).toBeTrue();
    }

    await headerCells[col].click();
    fixture.detectChanges();
    direction = await headerCells[1].getSortDirection();
    data = await table.getCellTextByIndex();
    colData = data.map(row => row[col]);
    expect(direction).toEqual("desc");
    for(let i = 1; i < colData.length; i ++){
      expect(colData[i] <= colData[i - 1]).toBeTrue();
    }
  })

  it('should show edit icon when showEdit is enabled', async () => {
    component.showEdit = true;
    component.showDelete = false;
    component.ngAfterViewInit();
    fixture.detectChanges();
    let editIcons = await loader.getAllHarnesses(MatIconHarness.with({name: "edit"}));
    expect(editIcons.length).toBeGreaterThan(0);
    let deleteIcons = await loader.getAllHarnesses(MatIconHarness.with({name: "delete"}));
    expect(deleteIcons.length).toEqual(0);
  })

  it('should show delete icon when showDelete is enabled', async () => {
    component.showEdit = false;
    component.showDelete = true;
    component.ngAfterViewInit();
    fixture.detectChanges();
    let editIcons = await loader.getAllHarnesses(MatIconHarness.with({name: "edit"}));
    expect(editIcons.length).toEqual(0);
    let deleteIcons = await loader.getAllHarnesses(MatIconHarness.with({name: "delete"}));
    expect(deleteIcons.length).toBeGreaterThan(0);
  })

  it('should not show edit and delete icons by default', async () => {
    component.ngAfterViewInit();
    fixture.detectChanges();
    let editIcons = await loader.getAllHarnesses(MatIconHarness.with({name: "edit"}));
    expect(editIcons.length).toEqual(0);
    let deleteIcons = await loader.getAllHarnesses(MatIconHarness.with({name: "delete"}));
    expect(deleteIcons.length).toEqual(0);
  })

  it('should show add button when showAdd is enabled', async () => {
    component.showAdd = true;
    fixture.detectChanges();
    let addButton = await loader.getAllHarnesses(MatButtonHarness.with({text: "addAdd"}));
    expect(addButton.length).toBeGreaterThan(0);
  })

  it('should not show add button when showAdd is disabled', async () => {
    component.showAdd = false;
    fixture.detectChanges();
    let addButton = await loader.getAllHarnesses(MatButtonHarness.with({text: "addAdd"}));
    expect(addButton.length).toBe(0);
  })

  it('should show the search input when showSearch is enabled', async () => {
    component.showSearch = true;
    fixture.detectChanges();
    let searchInput = await loader.getAllHarnesses(MatInputHarness.with({placeholder: "Search"}));
    expect(searchInput.length).toBeGreaterThan(0);
  })

  it('should not show the search input when showSearch is disabled', async () => {
    component.showSearch = false;
    fixture.detectChanges();
    let searchInput = await loader.getAllHarnesses(MatInputHarness.with({placeholder: "Search"}));
    expect(searchInput.length).toBe(0);
  })

});
