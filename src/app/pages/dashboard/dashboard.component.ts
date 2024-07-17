import { Component, OnInit, ɵɵpureFunction7 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { SideMenuComponent } from './components/sidemenu/sidemenu.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './components/account-settings';
import { ConfigService } from '@app/services/config.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SideMenuComponent,
    ProjectListComponent,
    AccountSettingsComponent,
    CommonModule
  ],
  template: `
    <app-header></app-header>

    <div class="flex ">
    <app-side-menu
      (stateChange)="onStateChange($event)"
      (state)="state"
    ></app-side-menu>
    <div class="flex-grow">
    <app-project-list class="max-w-full" *ngIf="state === 'general'"></app-project-list>
    <app-account-settings *ngIf="state === 'account'"></app-account-settings>
    </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  state: string = "general";

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      if (config) {
        console.log('All Sections:', this.configService.getSections());
        console.log('Typ section:', this.configService.getSection('Typ'));
        console.log('Deployment environments:', this.configService.getSubSection('deployment', 'environments'));
        console.log('Deployment provider options:', this.configService.getOptions('deployment', 'provider'));
        console.log('Default config:', this.configService.createDefaultProjectData());
      }
    });
  }

  onStateChange(state: string) {
    this.state = state;
  }
}
