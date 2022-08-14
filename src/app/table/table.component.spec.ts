import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from './table.component';
import {AppRoutingModule} from "../app-routing.module";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatRowHarness, MatTableHarness} from "@angular/material/table/testing";
import {MatCheckboxHarness} from "@angular/material/checkbox/testing";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";

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

});
