import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { ConfigureComponent } from './configure/configure.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Shopping Cart'
  },
  {
    path: 'configure/:id',
    component: ConfigureComponent,
    title: 'Configure'
  },{
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  }
];

export default routeConfig;
