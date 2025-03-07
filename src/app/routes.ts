import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PriceQuote } from './pages/price-quote/price-quote.component';
import { RoutesEnum, routes } from './data/routes';
import { CalendarComponent } from './pages/calendar/calendar.component';

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
    component: ContactComponent,
    title: routes[RoutesEnum.Contact].title,
  },
  {
    path: routes[RoutesEnum.PriceQuote].url,
    component: PriceQuote,
    title: routes[RoutesEnum.PriceQuote].title,
  },
  {
    path: routes[RoutesEnum.Calendar].url,
    component: CalendarComponent,
    title: routes[RoutesEnum.Calendar].title,
  },
  {
    path: '**',
    redirectTo: routes[RoutesEnum.Home].url,
  },
];

export default routeConfig;
