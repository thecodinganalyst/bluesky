import { LayoutModule } from '@angular/cdk/layout';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

import { NavigationComponent } from './navigation.component';
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatNavListHarness, MatNavListItemHarness} from "@angular/material/list/testing";
import {NavigationService} from "../store/navigation/navigation.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../store/app.state";
import {navigationSelector} from "../store/navigation/navigation.selector";
import {RouteData} from "../store/navigation/navigation.state";
import {AppRoutingModule} from "../app-routing.module";
import {selectFeatureAppName} from "../store/feature.selector";
import {RouterTestingModule} from "@angular/router/testing";

const tableContent = [
  {"id": 1, "name": "Hydrogen"},
  {"id": 2, "name": "Helium"},
  {"id": 3, "name": "Lithium"},
  {"id": 4, "name": "Beryllium"},
  {"id": 5, "name": "Boron"},
  {"id": 6, "name": "Carbon"},
  {"id": 7, "name": "Nitrogen"},
  {"id": 8, "name": "Oxygen"},
  {"id": 9, "name": "Fluorine"},
  {"id": 10, "name": "Neon"},
  {"id": 11, "name": "Sodium"},
  {"id": 12, "name": "Magnesium"},
  {"id": 13, "name": "Aluminum"},
  {"id": 14, "name": "Silicon"},
  {"id": 15, "name": "Phosphorus"},
  {"id": 16, "name": "Sulfur"},
  {"id": 17, "name": "Chlorine"},
  {"id": 18, "name": "Argon"},
  {"id": 19, "name": "Potassium"},
  {"id": 20, "name": "Calcium"}
];

const tableData = { "showCheckbox": true, "allowMultipleSelection": true, "showEdit": true, "showDelete": true, "showAdd": true, "showSearch": true, "content": tableContent };

const routeData: RouteData[] = [
    { "title": "Dashboard", "path": "dashboard", "componentName": "dashboard" },
    { "title": "Tree", "path": "tree", "componentName": "tree" },
    { "title": "Form", "path": "form", "componentName": "form" },
    { "title": "Table", "path": "table", "componentName": "table",
      "data": tableData },
    { "title": "Data", "path": "data", "componentName": "table",
      "data": { "showCheckbox": true, "allowMultipleSelection": true, "showEdit": true, "showDelete": true, "showAdd": true, "showSearch": true } }
  ];

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let loader: HarnessLoader;
  let store: MockStore<AppState>;
  let navList: MatNavListHarness;
  let navListItems: MatNavListItemHarness[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        AppRoutingModule,
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      providers: [NavigationService, provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(navigationSelector.menu, routeData);
    store.overrideSelector(selectFeatureAppName, "Blue Sky");
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    navList = await loader.getHarness(MatNavListHarness);
    navListItems = await navList.getItems();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show route title in toolbar', async () => {
    expect(navListItems.length).toBe(5);
    expect(await navListItems[2].getText()).toBe("Form");
    await navListItems[2].click();
    expect(await navListItems[3].getText()).toBe("Table");
    await navListItems[3].click();
  });

});

