import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ProjectService } from '@app/services/project.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-new-project-pop-up-element',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  template: `
    <div
      class="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
      role="alert"
    >
      <div class="flex items-center gap-4">
        <span class="shrink-0 rounded-full bg-blue-400 p-2 text-white">
          <svg
            class="h-4 w-4"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
              fill-rule="evenodd"
            />
          </svg>
        </span>

        <p class="font-medium sm:text-lg">{{ title }}</p>
      </div>
      <p class="mt-4 text-gray-500">
        {{ message }}
      </p>
      <form [formGroup]="projectForm" (submit)="submitForm">
        <label
          for="Name"
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 mt-3"
        >
          <input
            type="text"
            id="Name"
            class="p-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Name"
            formControlName="name"
          />

          <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
          >
            Projekt Name
          </span>
        </label>

        <div class="mt-6 sm:flex sm:gap-4">
          <a
            (click)="submitForm()"
            class="inline-block rounded border border-blue-500 bg-blue-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-500 focus:outline-none focus:ring active:text-blue-500 hover:cursor-pointer"
          >
            Erstellen
          </a>
          <a
            (click)="cancel.emit()"
            class="inline-block rounded border border-white-500 bg-white-500 px-8 py-3 text-sm font-medium text-blue-600 hover:bg-transparent hover:text-blue-500 focus:outline-none focus:ring active:text-blue-500 hover:cursor-pointer"
          >
            Zurück
          </a>
        </div>
      </form>
    </div>
  `,
})
export class NewProjectPopUpComponent {
  @Input() title = '';
  @Input() message = '';

  @Output() onClick = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<string>();

  projectService = inject(ProjectService);
  authService = inject(AuthService);

  projectForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private router: Router){}

  submitForm() {
    let name = this.projectForm.value.name;
    let uuid = crypto.randomUUID();
    let result = `${name}.${uuid}`;
    this.onClick.emit();
    this.projectService.addUuid(result);
    this.authService.addUuid(result);
    localStorage.setItem('uuid', result);

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'uuid',
      newValue: uuid
    }));

    this.router.navigate(['configure']);
  }
}
