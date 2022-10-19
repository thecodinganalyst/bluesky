import {Route} from "@angular/router";
import {DashboardComponent} from "../../dashboard/dashboard.component";
import {TreeComponent} from "../../tree/tree.component";
import {FormComponent} from "../../form/form.component";
import {TableComponent} from "../../table/table.component";
import {Type} from "@angular/core";

export type ComponentNames = "dashboard" | "tree" | "form" | "table";

export interface RouteData extends Route {
  componentName: ComponentNames
}

export const componentMap = new Map<ComponentNames, Type<any>>()
componentMap.set("dashboard", DashboardComponent)
componentMap.set("tree", TreeComponent)
componentMap.set("form", FormComponent)
componentMap.set("table", TableComponent)

export interface NavigationState {
  menu: RouteData[]
}
