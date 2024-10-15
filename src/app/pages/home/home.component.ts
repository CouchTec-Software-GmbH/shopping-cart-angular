import { ChangeDetectorRef, Component } from '@angular/core';
import { SectionComponent } from '@pages/home/components/section/section.component';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './components/popup/popup.component';
import { HeroComponent } from './components/hero/hero.component';
import { SolutionComponent } from './components/solution/solution.component';
import { SoGehtsComponent } from './components/sogehts/sogehts.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactSection } from './components/contact-section/contact-section.component';
import { StackSection } from './components/stack-section/stack-section.component';
import { ShowcaseSection } from './components/showcase/showcase.component';
import { PartnersComponent } from './components/partners/partners.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ShowcaseSection,
    PartnersComponent,
    StackSection,
    ContactSection,
    FooterComponent,
    HeaderComponent,
    PopUpComponent,
    CommonModule,
  ],
  template: `
    <div class="relative overflow-x-hidden">
      <div [class.blur]="popUpState" >
        <app-header></app-header>
        <app-hero></app-hero>
        <app-showcase></app-showcase>
        <app-partners></app-partners>
        <app-stack-section></app-stack-section>
        <app-contact-section></app-contact-section>
        <app-footer></app-footer>
      </div>
    </div>
    <app-pop-up (popUp)="popUpState = $event"></app-pop-up>
  `,
})
export class HomeComponent {
  popUpState: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  setPopUpState(state: boolean) {
    this.popUpState = state;
    this.cdr.detectChanges();
  }
}
