import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ConfigureComponent } from './pages/configure/configure.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Couchtec - Dashboard',
  },
  {
    path: 'kontakt',
    component: ContactComponent,
    title: 'Couchtec - Kontakt',
  },
  {
    path: 'configure',
    component: ConfigureComponent,
    title: 'Couchtec - Projekt',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default routeConfig;
