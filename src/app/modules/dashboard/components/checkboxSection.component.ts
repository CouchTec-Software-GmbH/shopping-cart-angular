import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkboxSection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mx-auto max-w-screen-xl mt-8">
      <section>
        <div class="mx-auto max-w-lg text-center">
          <h2 class="mt-10 mb-10 text-3xl font-bold sm:text-4xl text-gray-600">
{{title}}
          </h2>
        </div>
        <fieldset>
          <legend class="sr-only">Checkboxes</legend>

          <div *ngFor="let option of options" class="space-y-2">
            <label
              [attr.for]="option.id"
              class="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
            >
              <div class="flex items-center">
                &#8203;
                <input
                  type="checkbox"
                  class="size-4 rounded border-gray-300"
                  [id]="option.id"
                  [checked]="option.checked"
                />
              </div>
              <div>
                <strong class="font-medium text-gray-900">
                  {{ option.name }}
                </strong>
                <p class="mt-1 text-pretty text-sm text-gray-700">
                  {{ option.description }}
                </p>
              </div>
            </label>
          </div>
        </fieldset>
      </section>
    </div>
  `,
})
export class CheckboxSectionComponent {
  @Input() options: any[] = [];
  @Input() title: string = '';
}
