import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum, routes } from '@app/data/routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) { }

  navigateTo(route: RoutesEnum, params?: any, fragment?: string) {
    const url = routes[route].url;
    this.router.navigate([url], { queryParams: params, fragment: fragment });
  }

  navigateToAuth(params?: any) {
    this.navigateTo(RoutesEnum.Auth, params);
  }

  navigateToHome(params?: any, fragment?: string) {
    this.navigateTo(RoutesEnum.Home, params, fragment);
  }

  navigateToSuccessStories(params?: any, fragment?: string) {
    this.navigateTo(RoutesEnum.SuccessStories, params, fragment);
  }

  navigateToBosch(params?: any, fragment?: string) {
    this.navigateTo(RoutesEnum.Bosch, params, fragment);
  }

  navigateToHeyMano(params?: any, fragment?: string) {
    this.navigateTo(RoutesEnum.HeyMano, params, fragment);
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

  navigateToImpressum(params?: any) {
    this.navigateTo(RoutesEnum.Impressum, params);
  }

  navigateToAGB(params?: any) {
    this.navigateTo(RoutesEnum.AGB, params);
  }

  navigateToDatenschutz(params?: any) {
    this.navigateTo(RoutesEnum.Datenschutz, params);
  }
}
