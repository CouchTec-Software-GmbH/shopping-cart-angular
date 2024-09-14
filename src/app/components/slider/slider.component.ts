import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Option } from '@app/models/option';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div>
      <h2 class="sr-only">Steps</h2>

      <div>
        <div class="overflow-hidden rounded-full bg-gray-200">
          <div class="h-2 rounded-full w-2/5 bg-blue-500"
          ></div>
        </div>

        <ol class="mt-4 grid text-sm font-medium text-gray-500"
        [ngClass]="getGridClass(options.length)">
          <li class="flex items-center justify-start text-blue-600 sm:gap-1.5"
                  *ngFor="let option of options">
            <span class="hidden sm:inline"> {{option.display_name }} </span>

          </li>
        </ol>
      </div>
    </div>
  `,
})
export class SliderComponent {
  @Input() options: Option[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  uuid: string = crypto.randomUUID();
  selectionIndex: number = 0;

  onSelectionChange(selectionId: string): void {
    this.selectionChange.emit(selectionId);
  }

  getGridClass(length: number) {
    return `grid-cols-${length}`;
  }

  getWidthClass(length: number, index: number) {
    console.log(`w-${index}/${length - 1}`);
    return `w-${index}/${length}`;
  }
}
