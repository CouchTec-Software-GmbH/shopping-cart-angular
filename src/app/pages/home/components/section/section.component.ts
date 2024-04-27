import { Component } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  template: `
    <section>
      <div class="py-16">
        <div class="mx-auto px-6 max-w-6xl text-gray-800">
          <!-- Updated text color for better contrast -->
          <div class="relative">
            <div class="relative z-10 grid gap-3 grid-cols-6">
              <div
                class="col-span-full lg:col-span-2 overflow-hidden flex relative p-8 rounded-xl bg-white border border-gray-200"
              >
                <!-- Updated border and background -->
                <div class="size-fit m-auto relative">
                  <div class="relative h-24 w-56 flex items-center">
                    <svg
                      class="absolute inset-0 size-full text-gray-600"
                      viewBox="0 0 254 104"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- Updated SVG color -->
                      <!-- SVG paths remain unchanged -->
                    </svg>
                    <span
                      class="w-fit block mx-auto text-5xl font-semibold text-gray-800 bg-clip-text"
                      style="background-image: linear-gradient(to br, from-blue-500 to-pink-500);"
                      >100%</span
                    >
                    <!-- Updated text color and gradient for visibility -->
                  </div>
                  <h2
                    class="mt-6 text-center font-semibold text-gray-800 text-3xl"
                  >
                    Customizable
                  </h2>
                  <!-- Updated text color -->
                </div>
              </div>
              <div
                class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200"
              >
                <!-- Updated border and background -->
                <div>
                  <div
                    class="relative aspect-square rounded-full size-32 flex border mx-auto bg-gray-100 border-gray-200 before:absolute before:-inset-2 before:border before:border-gray-200 before:bg-gray-100 before:rounded-full"
                  >
                    <!-- Updated background and border for the circle -->
                    <svg
                      class="w-24 m-auto h-fit"
                      viewBox="0 0 212 143"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- SVG paths remain unchanged -->
                    </svg>
                  </div>
                  <div class="mt-6 text-center relative z-10 space-y-2">
                    <h2 class="text-lg font-medium text-gray-900">
                      Secure by default
                    </h2>
                    <!-- Updated text color -->
                    <p class="text-gray-600">
                      Provident fugit and vero voluptate. magnam magni doloribus
                      dolores voluptates a sapiente nisi.
                    </p>
                    <!-- Updated text color -->
                  </div>
                </div>
              </div>
              <div
                class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200"
              >
                <!-- Updated border and background -->
                <div>
                  <div class="pt-6 lg:px-6">
                    <svg
                      class="w-full"
                      viewBox="0 0 386 123"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- SVG content remains unchanged -->
                    </svg>
                  </div>
                  <div class="mt-14 text-center relative z-10 space-y-2">
                    <h2 class="text-lg font-medium text-gray-900">
                      Faster than light
                    </h2>
                    <!-- Updated text color -->
                    <p class="text-gray-600">
                      Provident fugit vero voluptate. magnam magni doloribus
                      dolores voluptates inventore nisi.
                    </p>
                    <!-- Updated text color -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SectionComponent { }
