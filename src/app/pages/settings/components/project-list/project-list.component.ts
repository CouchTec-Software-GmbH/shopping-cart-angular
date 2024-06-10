import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/services/auth.service';


@Component({
selector: 'app-project-list',
standalone: true,
imports: [
  RouterModule,
  CommonModule
],
template: `


<div class="overflow-x-auto m-20">
  <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead class="ltr:text-left rtl:text-right">
      <tr>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Erwartete Kosten</th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200" >
      <tr *ngFor="let project of projects">
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ project }}</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">Nicht begonnen</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>

<a
  class="inline-block rounded-full border border-indigo-600 bg-red-700 p-3 text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-700 m-2"
>
  <span class="sr-only"> Download </span>

<svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</a>
<a
  class="inline-block rounded-full border border-indigo-600 bg-blue-600 p-3 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 m-2"
>
  <span class="sr-only"> Download </span>

  <svg
    class="size-5 rtl:rotate-180"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
</a>
      </tr>
    </tbody>
  </table>
</div>

`,
})
export class ProjectListComponent implements OnInit {

  projects: string[] = [];
  authService = inject(AuthService);

  async ngOnInit(): Promise<void> {
    this.projects = await this.authService.getUuids();
  }
}
