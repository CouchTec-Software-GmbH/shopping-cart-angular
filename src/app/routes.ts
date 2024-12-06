import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PriceQuote } from './pages/price-quote/price-quote.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Couchtec - Home',
  },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Couchtec - Auth',
  },
  {
    path: 'kontakt',
    component: ContactComponent,
    title: 'Couchtec - Kontakt',
  },
  {
    path: 'price-quote',
    component: PriceQuote,
    title: 'Couchtec - Preis Schätzung',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default routeConfig;
