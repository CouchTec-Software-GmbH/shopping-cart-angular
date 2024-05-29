import { Component } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { BannerComponent } from '@pages/home/components/banner/banner.component';
import { SectionComponent } from '@pages/home/components/section/section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, SectionComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    <app-banner></app-banner>
    <app-section></app-section>
  `,
})
export class HomeComponent { }
