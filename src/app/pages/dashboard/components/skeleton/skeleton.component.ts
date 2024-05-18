import { Component } from '@angular/core';


@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
  ],
  template: `
<div class="skeleton-loader mt-4">
  <div class="skeleton-title"></div>
  <fieldset class="space-y-4">
    <legend class="sr-only">Delivery</legend>

    <div class="skeleton-card"></div>
    <div class="skeleton-card"></div>
    <div class="skeleton-card"></div>
    <div class="skeleton-card"></div>
    <div class="skeleton-card"></div>
    <div class="skeleton-card"></div>
  </fieldset>
</div>
  `,
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent {
}
