import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum, routes } from '@app/data/routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) { }

  navigateTo(route: RoutesEnum, params?: any) {
    const url = routes[route].url;
    this.router.navigate([url], { queryParams: params });
  }

  navigateToAuth(params?: any) {
    this.navigateTo(RoutesEnum.Auth, params);
  }

  navigateToHome(params?: any) {
    this.navigateTo(RoutesEnum.Home, params);
  }

  navigateToContact(params?: any) {
    this.navigateTo(RoutesEnum.Contact, params);
  }

  navigateToPriceQuote(params?: any) {
    this.navigateTo(RoutesEnum.PriceQuote, params);
  }

  navigateToDashboard(params?: any) {
    this.navigateTo(RoutesEnum.Dashboard, params);
  }
}
