import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordionCheckboxSection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mx-auto max-w-screen-xl mt-8">
      <section>
        <div class="mx-auto max-w-lg text-center">
          <h2 class="mt-10 mb-10 text-3xl font-bold sm:text-4xl text-gray-600">
            {{ title }}
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

    <div class="relative font-inter antialiased">
      <main
        class="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden"
      >
        <div class="w-full max-w-2xl mx-auto px-4 md:px-6 py-24">
          <h1 class="text-2xl font-bold text-slate-900 mb-4">FAQs</h1>
          <!-- Accordion component -->
          <div class="divide-y divide-slate-200">
            <!-- Accordion item -->
            <div x-data="{ expanded: false }" class="py-2">
              <h2>
                <button
                  id="faqs-title-01"
                  type="button"
                  class="flex items-center justify-between w-full text-left font-semibold py-2"
                  (click)="toggleExpanded()"
[attr.aria-expanded]="expanded"
                  aria-controls="faqs-text-01"
                >
                  <span>What are the advantages of your service?</span>
                  <svg
                    class="fill-indigo-500 shrink-0 ml-8"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                  </svg>
                </button>
              </h2>
              <div
                id="faqs-text-01"
                role="region"
                aria-labelledby="faqs-title-01"
                class="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
                :class="expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
              >
                <div class="overflow-hidden">
                  <p class="pb-3">
                    If you go over your organisations or user limit, a member of
                    the team will reach out about bespoke pricing. In the
                    meantime, our collaborative features won't appear in
                    accounts or users that are over the 100-account or
                    1,000-user limit.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- End: Accordion component -->
        </div>
      </main>
    </div>
  `,
})
export class AccordionCheckboxSectionComponent {
  @Input() options: any[] = [];
  @Input() title: string = '';

  expanded = false;

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
}
