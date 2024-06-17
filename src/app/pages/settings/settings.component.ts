import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { SideMenuComponent } from './components/sidemenu/sidemenu.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SideMenuComponent,
    ProjectListComponent,
    CommonModule
  ],
  template: `
    <app-header></app-header>

    <div class="flex ">
    <app-side-menu
      (stateChange)="onStateChange($event)"
      (state)="state"
    ></app-side-menu>
    <app-project-list *ngIf="state === 'projects'"></app-project-list>
    </div>
  `,
})
export class SettingsComponent implements OnInit {
  state: string = "projects";

  ngOnInit(): void {
  }

  onStateChange(state: string) {
    this.state = state;
  }
}