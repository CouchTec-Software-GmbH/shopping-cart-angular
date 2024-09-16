import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { SectionComponent } from '@pages/home/components/section/section.component';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './components/popup/popup.component';
import { HeroComponent } from './components/hero/hero.component';
import { SolutionComponent } from './components/solution/solution.component';
import { SoGehtsComponent } from './components/sogehts/sogehts.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    SectionComponent,
    SoGehtsComponent,
    SolutionComponent,
    FooterComponent,
    HeaderComponent,
    PopUpComponent,
    CommonModule,
  ],
  template: `
    <div class="relative">
      <div [class.blur]="popUpState" >
        <app-hero></app-hero>
        <app-solution></app-solution>
        <app-sogehts>        </app-sogehts>
        <app-footer>        </app-footer>
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
