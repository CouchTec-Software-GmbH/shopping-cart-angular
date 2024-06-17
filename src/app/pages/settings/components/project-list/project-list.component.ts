import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SkeletonComponent } from '@app/pages/dashboard/components/skeleton/skeleton.component';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterModule, CommonModule, SkeletonComponent],
  template: `
    <div class="overflow-x-auto m-20">
      <div *ngIf="projects_loaded">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Erwartete Kosten
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr *ngFor="let project of projects">
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {{ project.split('.')[0] }}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                Nicht begonnen
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                $120,000
              </td>

              <span
                class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm"
              >
                <button
                  class="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="Edit Product"
                  (click)="openProject(project)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  class="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="Delete Product"
                  (click)="deleteProject(project)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </span>
            </tr>
          </tbody>
        </table>
        <p *ngIf="projects.length === 0"> Keine Projekte zu zeigen </p>
      </div>
      <div *ngIf="!projects_loaded">
        <app-skeleton></app-skeleton>
      </div>


    </div>
  `,
})
export class ProjectListComponent implements OnInit {
  projects: string[] = [];
  authService = inject(AuthService);
  projects_loaded = false;

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.reloadProjects();
  }

  openProject(uuid: string): void {
    localStorage.setItem('uuid', uuid);

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'uuid',
        newValue: uuid,
      }),
    );

    this.router.navigate(['dashboard']);
  }

  async reloadProjects(): Promise<void> {
    this.projects_loaded = false;
    this.projects = await this.authService.getUuids();
    this.projects_loaded = true;
  }

  async deleteProject(uuid: string): Promise<void> {
    await this.authService.remove_uuid(uuid);
    this.reloadProjects()
  }
}
