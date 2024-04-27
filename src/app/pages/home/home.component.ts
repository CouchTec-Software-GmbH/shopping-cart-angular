import { Component } from '@angular/core';
import { BannerComponent } from '@pages/home/components/banner/banner.component';
import { SectionComponent } from '@pages/home/components/section/section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, SectionComponent],
  template: `
    <app-banner></app-banner>
    <app-section></app-section>
  `,
})
export class HomeComponent { }
