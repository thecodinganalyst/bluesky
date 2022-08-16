import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TreeComponent} from "./tree/tree.component";
import {TableComponent} from "./table/table.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent},
  { path: "tree", component: TreeComponent},
  { path: "table", component: TableComponent, data: { showCheckbox: true, allowMultipleSelection: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
