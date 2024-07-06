import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SkeletonComponent } from '@app/pages/configure/components/skeleton/skeleton.component';
import { AuthService } from '@app/services/auth.service';
import { ProductService } from '@app/services/product.service';
import { ProjectService } from '@app/services/project.service';
import { ProjectData } from '@models/project-data';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterModule, CommonModule, SkeletonComponent],
  template: `
    <div class="flex bg-beige-light h-screen">
      <div class="flex flex-col m-10 w-full space-y-4">
        <h1 class="text-xl font-medium">Projekt Portfolio</h1>
        <div
          class="grid grid-cols-4 gap-4 px-5 items-center rounded bg-beige-dark p-4 text-gray-600"
        >
          <p class="text-sm pl-10">Projektname</p>
          <p class="md:block hidden text-sm">Status</p>
          <p class="sm:block hidden text-sm">Kurzbeschreibung</p>
          <p class="sm:block hidden text-sm"></p>
        </div>

        <div
          *ngIf="uuids === []"
          class="grid h-screen place-content-center bg-white px-4"
        >
          <h1 class="uppercase tracking-widest text-gray-500">
            404 | Not Found
          </h1>
        </div>

        <details
          *ngFor="let uuid of uuids"
          class="group transition-all duration-500 ease-in-out"
        >
          <summary
            class="grid grid-cols-4 cursor-pointer items-center gap-4 group-closed:rounded group-open:rounded-t bg-white group-open:bg-darkgreen py-6 px-5 group-open:text-white shadow-sm group-open:border-darkgreen duration-300"
          >
            <div class="flex justify-start gap-4 items-center">
              <svg
                class="size-6 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-gray-400 group-open:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <h2 class="font-medium text-sm">{{ uuid.split('.')[0] }}</h2>
            </div>
            <h2 class="font-medium text-sm">In Bearbeitung</h2>
            <h2 class="font-medium text-sm"> {{ projects.get(uuid)?.shortText }}</h2>
            <span
              class="justify-self-end inline-flex overflow-hidden rounded-md border bg-white shadow-sm"
            >
              <button
                class="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                title="Edit Product"
                (click)="openProject(uuid)"
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
                (click)="deleteProject(uuid)"
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
          </summary>
          <div class="content-wrapper border border-darkgreen rounded-b">
            <div
              class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm px-10"
            >
              <dl class="-my-3 divide-y divide-gray-100 text-sm">
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Project Type</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.projectType }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Tiers</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.tierOptions }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Frontend Framework</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.techStack?.frontend?.framework }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Styling</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.techStack?.frontend?.styling }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Middleware</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.techStack?.middleware }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Backend</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.techStack?.backend }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Database</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.techStack?.database }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Provider</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.deployment?.provider }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Containerization</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.deployment?.containerization }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Orchestration</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.deployment?.orchestration }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Environments</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.deployment?.environment }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Security</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.security }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Monitoring</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.monitoring }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Additional Features</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ projects.get(uuid)?.extra }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </details>

        <p *ngIf="uuids.length === 0" class="flex justify-center">
          Noch keine Projekte vorhanden.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      details > summary {
        list-style: none;
      }
      details > .content-wrapper {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out;
      }
      details[open] > .content-wrapper {
        max-height: 1000px; /* arbitrary value large enough for the content */
      }
    `,
  ],
})
export class ProjectListComponent implements OnInit {
  uuids: string[] = [];
  projects: Map<String, ProjectData> = new Map();
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  productService = inject(ProductService);
  projects_loaded = false;
  projects_data: ProjectData[] = [];

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
    this.router.navigate(['configure']);
  }

  async reloadProjects(): Promise<void> {
    this.projects_loaded = false;
    this.uuids = await this.authService.getUuids();
    this.uuids.forEach(async (uuid) => {
      let project = await this.productService.getProject(uuid);
      this.projects.set(uuid, project);
    });
    this.projects_loaded = true;
  }

  async deleteProject(uuid: string): Promise<void> {
    await this.authService.remove_uuid(uuid);
    this.projectService.removeUuid(uuid);
    this.reloadProjects();
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'uuid',
        newValue: '',
      }),
    );
  }
}
