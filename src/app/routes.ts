import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { CartComponent } from '@pages/cart/cart.component';
import { DetailsComponent } from '@pages/details/details.component';
import { ConfigureComponent } from '@pages/configure/configure.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'services',
    component: ProductsComponent,
    title: 'Services'
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
