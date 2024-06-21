import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Couchtec - Home'
  },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Couchtec - Auth'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Couchtec - Dashboard'
  },
  {
    path: 'support',
    component: ContactComponent,
    title: 'Couchtec - Support'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Couchtec - Settings'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default routeConfig;
