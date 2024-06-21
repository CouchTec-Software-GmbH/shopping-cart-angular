import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="bg-gray-50">
      <div
        class="mx-auto max-w-screen-xl px-4 py-32 lg:items-center"
      >
        <div class="mx-auto max-w-xl text-center">
          <h1 class="text-7xl font-extrabold sm:text-7xl">
            CouchTec
            <strong class="font-extrabold text-blue-700 sm:block">
              Kundenportal
            </strong>
          </h1>

          <p class="mt-4 sm:text-2xl/relaxed">
            Konfigurieren Sie Ihre Projekte
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              class="block w-full rounded bg-blue-600 px-12 py-3 text-sm text-white font-medium  shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          [routerLink]="['/dashboard']"
            >
              Starten
            </a>
            <a
              class="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"

            >
              Mehr erfahren
            </a>
          </div>
        </div>
      </div>
    </section>

     `,
})
export class BannerComponent {
}
