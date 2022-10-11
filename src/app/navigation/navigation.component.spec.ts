import { LayoutModule } from '@angular/cdk/layout';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

import { NavigationComponent } from './navigation.component';
import {StoreModule} from "@ngrx/store";
import {featureReducer} from "../store/feature.reducer";
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatNavListHarness} from "@angular/material/list/testing";
import {TableComponent} from "../table/table.component";
import {RouterTestingModule} from "@angular/router/testing";
import {Routes} from "@angular/router";
import {MockComponent} from "ng-mocks";

const routes: Routes = [
  { path: "table", component: MockComponent(TableComponent), title: "Table Route" }
];

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        StoreModule.forRoot({feature: featureReducer, router: routerReducer}),
        StoreRouterConnectingModule.forRoot()
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show route title in toolbar', async () => {
    var navList = await loader.getHarness(MatNavListHarness);
    var navListItems = await navList.getItems();
    expect(navListItems.length).toBe(5);
    expect(await navListItems[2].getText()).toBe("Form");
    await navListItems[2].click();
    expect(await navListItems[3].getText()).toBe("Table");
    await navListItems[3].click();
    fixture.detectChanges();
    expect(component.title).toBe("Blue Sky");
  });
});

