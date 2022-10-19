import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {first, Observable} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {selectFeatureAppName} from "../store/feature.selector";
import {Route, Router} from "@angular/router";
import {navigationSelector} from "../store/navigation/navigation.selector";
import {NavigationService} from "../store/navigation/navigation.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  title?: string = "";
  appName$: Observable<string> | undefined;
  routeLoaded = false;
  menu: Route[] = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.appName$ = this.store.select(selectFeatureAppName);
    this.store.select(navigationSelector.menu).pipe(first()).subscribe(menu => {
      this.menu = this.navigationService.initRoutes(menu)
      this.router.resetConfig(this.menu)
      this.routeLoaded = true
    })
  }

}
