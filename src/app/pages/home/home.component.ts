import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, SectionComponent],
  template: `
    <app-banner></app-banner>
    <app-section></app-section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent { }
