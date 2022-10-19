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
import {MatNavListHarness} from "@angular/material/list/testing";
import {NavigationService} from "../store/navigation/navigation.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../store/app.state";
import {navigationSelector} from "../store/navigation/navigation.selector";
import {RouteData} from "../store/navigation/navigation.state";
import {AppRoutingModule} from "../app-routing.module";
import {appNameSelector} from "../store/feature.selector";

const routeData: RouteData[] = [
    { "title": "Dashboard", "path": "dashboard", "componentName": "dashboard" },
    { "title": "Tree", "path": "tree", "componentName": "tree" },
    { "title": "Form", "path": "form", "componentName": "form" },
    { "title": "Table", "path": "table", "componentName": "table",
      "data": { "showCheckbox": true, "allowMultipleSelection": true, "showEdit": true, "showDelete": true, "showAdd": true, "showSearch": true } },
    { "title": "Data", "path": "data", "componentName": "table",
      "data": { "showCheckbox": true, "allowMultipleSelection": true, "showEdit": true, "showDelete": true, "showAdd": true, "showSearch": true } }
  ];

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let loader: HarnessLoader;
  let store: MockStore<AppState>;

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
      ],
      providers: [NavigationService, provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(navigationSelector.menu, routeData);
    store.overrideSelector(appNameSelector, "Blue Sky")
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show route title in toolbar', async () => {
    let navList = await loader.getHarness(MatNavListHarness);
    let navListItems = await navList.getItems();
    expect(navListItems.length).toBe(5);
    expect(await navListItems[2].getText()).toBe("Form");
    await navListItems[2].click();
    expect(await navListItems[3].getText()).toBe("Table");
    await navListItems[3].click();
    fixture.detectChanges();
    expect(component.title).toBe("Blue Sky");
  });

});

