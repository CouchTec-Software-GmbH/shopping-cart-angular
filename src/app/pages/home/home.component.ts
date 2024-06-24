import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { BannerComponent } from '@pages/home/components/banner/banner.component';
import { SectionComponent } from '@pages/home/components/section/section.component';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './components/popup/popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    SectionComponent,
    HeaderComponent,
    PopUpComponent,
    CommonModule,
  ],
  template: `
    <div class="relative">
      <div [class.blur]="popUpState">
        <app-header></app-header>
        <app-banner></app-banner>
        <app-section></app-section>
      </div>
    </div>
    <app-pop-up (popUp)="popUpState = $event"></app-pop-up>
  `,
})
export class HomeComponent {
  popUpState: boolean = false;

  constructor(private cdr: ChangeDetectorRef){}

  setPopUpState(state: boolean) {
    this.popUpState = state;
    this.cdr.detectChanges();
  }
}
