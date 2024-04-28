import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Step } from '@models/step';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule],
  template: `
<div>
  <h2 class="sr-only">Steps</h2>
  <div>
    <ol class="flex items-center gap-2 text-xs font-medium text-gray-500 sm:gap-4">
      <li class="flex items-center justify-end gap-2" *ngFor="let step of steps; let i = index" [ngClass]="{ 'text-blue-600': i === currentStep,
        'text-gray-600': i > currentStep,
        'text-green-600': i < currentStep
        }">

        <span
          class="size-6 rounded text-center text-[10px]/6 font-bold "
          [ngClass]="{ 'bg-blue-50': i === currentStep,
                        'bg-gray-50 text-gray-600': i > currentStep,
                        'bg-green-50 text-green-600 ': i < currentStep
                    }">
          {{ i + 1 }}
        </span>
        <span> {{ step.name }} </span>

      </li>
    </ol>
  </div>
</div>
  `,
})
export class StepsComponent {
  @Input() steps: Step[] = [];
  @Input() currentStep: number = 0;
}
