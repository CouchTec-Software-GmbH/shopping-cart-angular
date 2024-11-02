import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './components/sidemenu/sidemenu.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './components/account-settings';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    SideMenuComponent,
    ProjectListComponent,
    AccountSettingsComponent,
    CommonModule,
  ],
  template: ` <app-project-list></app-project-list> `,
})
export class DashboardComponent implements OnInit {
  state: string = 'general';

  ngOnInit(): void {}

  onStateChange(state: string) {
    this.state = state;
  }
}
