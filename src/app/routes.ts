import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PriceQuote } from './pages/price-quote/price-quote.component';
import { RoutesEnum, routes } from './data/routes';
import { BookingComponent } from './pages/booking/booking.component';
import { BoschComponent } from './pages/bosch/bosch.component';
import { SuccessStoriesComponent } from './pages/success-stories/success-stories.component';
import { HeyManoComponent } from './pages/heymano/heymano.component';
import { ImpressumComponent } from './pages/legal/impressum/impressum.component';
import { PrivacyPolicyComponent } from './pages/legal/datenschutz/datenschutz.component';
import { TermsAndConditionsComponent } from './pages/legal/agb/agb.component';

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
    path: routes[RoutesEnum.Bosch].url,
    component: BoschComponent,
    title: routes[RoutesEnum.Bosch].title,
  },
  {
    path: routes[RoutesEnum.HeyMano].url,
    component: HeyManoComponent,
    title: routes[RoutesEnum.HeyMano].title,
  },
  {
    path: routes[RoutesEnum.Impressum].url,
    component: ImpressumComponent,
    title: routes[RoutesEnum.Impressum].title,
  },
  {
    path: routes[RoutesEnum.Datenschutz].url,
    component: PrivacyPolicyComponent,
    title: routes[RoutesEnum.Datenschutz].title,
  },
  {
    path: routes[RoutesEnum.AGB].url,
    component: TermsAndConditionsComponent,
    title: routes[RoutesEnum.AGB].title,
  },
  {
    path: routes[RoutesEnum.SuccessStories].url,
    component: SuccessStoriesComponent,
    title: routes[RoutesEnum.SuccessStories].title,
  },
  {
    path: '**',
    redirectTo: routes[RoutesEnum.Home].url,
  },
];

export default routeConfig;
