import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeatureSection } from '../home/components/feature-section/feature-section.component';
import { HeaderComponent } from '../home/components/header/header.component';
import { FooterComponent } from '../home/components/footer/footer.component';

@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [RouterModule, CommonModule, FeatureSection, HeaderComponent, FooterComponent],
  templateUrl: './success-stories.component.html',
})
export class SuccessStoriesComponent {}
