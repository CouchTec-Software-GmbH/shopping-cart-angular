import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { CartComponent } from '@pages/cart/cart.component';
import { DetailsComponent } from '@pages/details/details.component';
import { ConfigureComponent } from '@pages/configure/configure.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Couchtec - Home'
  },
  {
    path: 'services',
    component: ProductsComponent,
    title: 'Couchtec - Services'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Couchtec - Cart'
  },
  {
    path: 'configure/:id',
    component: ConfigureComponent,
    title: 'Couchtec - Configure'
  },{
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Couchtec - Dashboard'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Couchtec Details'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Couchtec - Contact'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default routeConfig;
