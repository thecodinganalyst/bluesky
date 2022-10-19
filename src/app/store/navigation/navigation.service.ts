import {Injectable} from "@angular/core";
import {Route, Routes} from "@angular/router";
import {componentMap, RouteData} from "./navigation.state";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  initRoutes(menu: RouteData[]): Routes{
    const routes: Route[] = [];
    for (const item of menu){
      routes.push({
        path: item.path,
        title: item.title,
        component: componentMap.get(item.componentName),
        data: item.data
      });
    }
    return routes;
  }
}
