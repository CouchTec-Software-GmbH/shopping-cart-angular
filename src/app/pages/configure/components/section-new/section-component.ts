import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubSectionComponent } from '../sub-section/sub-section.component';
import { SubSection } from '@app/models/sub-section';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, SubSectionComponent],
  template: `
    <div class="max-w-full">
      <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
      [ngClass]="{ 'hidden': title?.length === 0 }"
      >
        {{ title ?? ''}}
      </h1>

      <p class="mt-4 leading-relaxed text-gray-500"
        [ngClass]="{ 'hidden': sub_title?.length === 0 }"
      >
        {{ sub_title ?? ''}}
      </p>

      <app-sub-section
        *ngFor="let sub_section of sub_sections"
        [options]="sub_section.options"
        [title]="sub_section.title"
        [sub_title]="sub_section.sub_title"
        [key]="sub_section.key"
      >
      </app-sub-section>
    </div>
  `,
})
export class SectionComponent implements OnInit {
  @Input() key: string = '';
  @Input() display_name: string = '';
  @Input() title: string = '';
  @Input() sub_title: string = '';
  @Input() sub_sections: SubSection[] = [];


  ngOnInit(): void {
    // console.log("section: ", this.display_name);
    // this.sub_sections.forEach(sub_section => {
    //   console.log(sub_section.sub_title);
    // });
  }
}
