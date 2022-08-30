import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TreeComponent} from "./tree/tree.component";
import {TableComponent} from "./table/table.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, title: "Dashboard"},
  { path: "tree", component: TreeComponent, title: "Tree"},
  { path: "table", component: TableComponent, title: "Table", data: { showCheckbox: true, allowMultipleSelection: true, showEdit: true, showDelete: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
