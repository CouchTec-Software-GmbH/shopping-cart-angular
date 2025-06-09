import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactSection } from './components/contact-section/contact-section.component';
import { StackSection } from './components/stack-section/stack-section.component';
import { ShowcaseSection } from './components/showcase/showcase.component';
import { PartnersComponent } from './components/partners/partners.component';
import { MobileSection } from './components/mobile/mobile.component';
import { SelectType } from './components/select-type/select-type.component';
import { FeatureSection } from './components/feature-section/feature-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ShowcaseSection,
    PartnersComponent,
    MobileSection,
    StackSection,
    ContactSection,
    FooterComponent,
    HeaderComponent,
    FeatureSection,
    SelectType,
    CommonModule,
  ],
  template: `
    <div class="relative overflow-x-hidden">
      <div [class.blur]="popUpState">
        <app-header></app-header>
        <app-hero></app-hero>
        <app-showcase></app-showcase>
        <app-feature-section></app-feature-section>
        <app-select-type></app-select-type>
        <app-partners></app-partners>
        <app-mobile></app-mobile>
        <app-stack-section></app-stack-section>
        <app-contact-section></app-contact-section>
        <app-footer></app-footer>
      </div>
    </div>
  `,
})
export class HomeComponent {
  popUpState: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  setPopUpState(state: boolean) {
    this.popUpState = state;
    this.cdr.detectChanges();
  }
}
