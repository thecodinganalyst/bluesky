import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TreeComponent} from "./tree/tree.component";
import {TableComponent} from "./table/table.component";
import {FormComponent} from "./form/form.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, title: "Dashboard"},
  { path: "tree", component: TreeComponent, title: "Tree"},
  { path: "form", component: FormComponent, title: "Form"},
  { path: "table", component: TableComponent, title: "Table", data: { showCheckbox: true, allowMultipleSelection: true, showEdit: true, showDelete: true, showAdd: true, showSearch: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
