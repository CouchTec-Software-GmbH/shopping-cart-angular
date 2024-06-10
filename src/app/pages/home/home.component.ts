import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { BannerComponent } from '@pages/home/components/banner/banner.component';
import { SectionComponent } from '@pages/home/components/section/section.component';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './components/popup/popup.component';
import { InputPopUpComponent } from './components/input-popup/input-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, SectionComponent, HeaderComponent, PopUpComponent, CommonModule, InputPopUpComponent],
  template: `
    <div class="relative">
    <div [class.blur]="popUpState">
    <app-header></app-header>
    <app-banner></app-banner>
    <app-section></app-section>
    </div>
    </div>

    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" (onClick)="onPopUpClick()">
      <app-pop-up *ngIf="popUpState === 'verifyEmail'"
        (onClick)="onPopUpClick()"
        [message]="'Wir haben dir eine Bestätigunsemail geschickt. Um das Konto zu aktivieren, klicken Sie bitte auf den Aktivierungslink in Ihrer E-Mail.'"
        [title]="'Bestätige deine E-Mail'"
      ></app-pop-up>
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" (onClick)="onPopUpClick()">
      <app-pop-up *ngIf="popUpState === 'forgotPassword'"
        (onClick)="onPopUpClick()"
        [message]="'Wir haben Ihnen eine Zurücksetzungsemail geschickt. Um das Password zurückzusetzen, klicken Sie bitte auf den Zurücksetzungslink in Ihrer E-Mail.'"
        [title]="'Wir haben Ihnen eine E-Mail geschickt.'"
      ></app-pop-up>
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" (onClick)="onPopUpClick()">
      <app-pop-up *ngIf="popUpState === 'registerSuccess'"
        (onClick)="onPopUpClick()"
        [message]="'Sie können sich nun anmelden.'"
        [title]="'Ihr Konto wurde registriert.'"
      ></app-pop-up>
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" (onClick)="onPopUpClick()">
      <app-pop-up *ngIf="popUpState === 'resetSuccess'"
        (onClick)="onPopUpClick()"
        [message]="'Sie können sich nun mit Ihrem neuen Password anmelden.'"
        [title]="'Ihr Password wurde erfolgreich geändert.'"
      ></app-pop-up>
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" (onClick)="onPopUpClick()">
      <app-pop-up *ngIf="popUpState === 'resetSuccess'"
        (onClick)="onPopUpClick()"
        [message]="'Sie können sich nun mit Ihrem neuen Password anmelden.'"
        [title]="'Ihr Password wurde erfolgreich geändert.'"
      ></app-pop-up>
    </div>

    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" (onClick)="onPopUpClick()">
      <app-pop-up *ngIf="popUpState === 'resetSuccess'"
        (onClick)="onPopUpClick()"
        [message]="'Sie können sich nun mit Ihrem neuen Password anmelden.'"
        [title]="'Ihr Password wurde erfolgreich geändert.'"
      ></app-pop-up>
    </div>

    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" (onClick)="onPopUpClick()">
      <app-input-pop-up *ngIf="popUpState === 'chooseName'"
        (onClick)="onPopUpClick()"
        [message]="'Wählen Sie einen Name für Ihr neues Projekt'"
        [title]="'Neues Projekt'"
      ></app-input-pop-up>
    </div>
  `,
})
export class HomeComponent implements OnInit {

  popUpState = "";
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['verifyEmail']) {
        this.popUpState = 'verifyEmail';
        this.removeQueryParam('verifyEmail');
      } else if (params['forgotPassword']) {
        this.popUpState = 'forgotPassword';
        this.removeQueryParam('forgotPassword');
      } else if (params['registerSuccess']) {
        this.popUpState = 'registerSuccess';
        this.removeQueryParam('registerSuccess');
      } else if (params['resetSuccess']) {
        this.popUpState = 'resetSuccess';
        this.removeQueryParam('resetSuccess');
      } else if (params['chooseName']) {
        this.popUpState = 'chooseName';
        // this.removeQueryParam('chooseName');
      }
    });
  }

  onPopUpClick() {
    this.popUpState = "";
  }

  removeQueryParam(param: string) {
    const queryParams = { ...this.route.snapshot.queryParams };
    delete queryParams[param];
    this.router.navigate([], {queryParams});
  }
}
