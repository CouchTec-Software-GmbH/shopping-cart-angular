import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PriceQuote } from './pages/price-quote/price-quote.component';
import { RoutesEnum, routes } from './data/routes';
import { BookingComponent } from './pages/booking/booking.component';

const routeConfig: Routes = [
  {
    path: routes[RoutesEnum.Home].url,
    component: HomeComponent,
    title: routes[RoutesEnum.Home].title,
  },
  {
    path: routes[RoutesEnum.Auth].url,
    component: AuthComponent,
    title: routes[RoutesEnum.Auth].title,
  },
  {
    path: routes[RoutesEnum.Contact].url,
    component: BookingComponent,
    title: routes[RoutesEnum.Contact].title,
  },
  {
    path: routes[RoutesEnum.PriceQuote].url,
    component: PriceQuote,
    title: routes[RoutesEnum.PriceQuote].title,
  },
  {
    path: '**',
    redirectTo: routes[RoutesEnum.Home].url,
  },
];

export default routeConfig;
