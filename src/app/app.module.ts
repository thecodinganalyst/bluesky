import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { TreeComponent } from './tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { AppRoutingModule } from "./app-routing.module";
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {StoreModule} from "@ngrx/store";
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {featureReducer} from "./store/feature.reducer";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {tableReducer} from "./store/table/table.reducer";
import { FormComponent } from './form/form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {formReducer} from "./store/form/form.reducer";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    TreeComponent,
    TableComponent,
    FormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    StoreModule.forRoot({
      feature: featureReducer,
      form: formReducer,
      router: routerReducer,
      table: tableReducer}
    ),
    StoreRouterConnectingModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
