import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="">
      <h2 class="text-2xl font-bold text-gray-700 text-center mb-6">Anmelden</h2>
      <button
        class="flex items-center justify-center w-full py-2 mb-4 border rounded-lg hover:bg-gray-100"
      >
        <svg
          class="mr-2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        <span> Mit Google anmelden </span>
      </button>
      <div class="flex justify-between mb-4">
        <button
          class="flex items-center justify-center mr-4 w-12 h-12 border rounded-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 72 72"
          >
            <path
              d="M36,12c13.255,0,24,10.745,24,24c0,10.656-6.948,19.685-16.559,22.818c0.003-0.009,0.007-0.022,0.007-0.022	s-1.62-0.759-1.586-2.114c0.038-1.491,0-4.971,0-6.248c0-2.193-1.388-3.747-1.388-3.747s10.884,0.122,10.884-11.491	c0-4.481-2.342-6.812-2.342-6.812s1.23-4.784-0.426-6.812c-1.856-0.2-5.18,1.774-6.6,2.697c0,0-2.25-0.922-5.991-0.922	c-3.742,0-5.991,0.922-5.991,0.922c-1.419-0.922-4.744-2.897-6.6-2.697c-1.656,2.029-0.426,6.812-0.426,6.812	s-2.342,2.332-2.342,6.812c0,11.613,10.884,11.491,10.884,11.491s-1.097,1.239-1.336,3.061c-0.76,0.258-1.877,0.576-2.78,0.576	c-2.362,0-4.159-2.296-4.817-3.358c-0.649-1.048-1.98-1.927-3.221-1.927c-0.817,0-1.216,0.409-1.216,0.876s1.146,0.793,1.902,1.659	c1.594,1.826,1.565,5.933,7.245,5.933c0.617,0,1.876-0.152,2.823-0.279c-0.006,1.293-0.007,2.657,0.013,3.454	c0.034,1.355-1.586,2.114-1.586,2.114s0.004,0.013,0.007,0.022C18.948,55.685,12,46.656,12,36C12,22.745,22.745,12,36,12z"
            ></path>
          </svg>
        </button>
        <button
          class="flex items-center justify-center mx-4 w-12 h-12 border rounded-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
          >
            <path
              fill="#ff5722"
              d="M6 6H22V22H6z"
              transform="rotate(-180 14 14)"
            ></path>
            <path
              fill="#4caf50"
              d="M26 6H42V22H26z"
              transform="rotate(-180 34 14)"
            ></path>
            <path
              fill="#ffc107"
              d="M26 26H42V42H26z"
              transform="rotate(-180 34 34)"
            ></path>
            <path
              fill="#03a9f4"
              d="M6 26H22V42H6z"
              transform="rotate(-180 14 34)"
            ></path>
          </svg>
        </button>
        <button
          class="flex items-center justify-center ml-4 w-12 h-12 border rounded-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 50 50"
          >
            <path
              d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="flex items-center mb-4">
        <hr class="flex-grow border-t border-gray-300" />
        <span class="mx-2 text-gray-500"> or </span>
        <hr class="flex-grow border-t border-gray-300" />
      </div>
      <button
        class="flex items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-100"
        (click)="output()"
      >
        <svg
          class="mr-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 128 128"
          viewBox="0 0 128 128"
          id="email"
        >
          <path
            fill="#505070"
            d="M112 105H16c-5.514 0-10-4.486-10-10V30c0-5.514 4.486-10 10-10h96c5.514 0 10 4.486 10 10v65c0 5.514-4.486 10-10 10zM16 24c-3.309 0-6 2.691-6 6v65c0 3.309 2.691 6 6 6h96c3.309 0 6-2.691 6-6V30c0-3.309-2.691-6-6-6H16z"
          ></path>
          <path
            fill="#505070"
            d="M64 65.04a5.989 5.989 0 0 1-3.456-1.101L8.003 33.734a2.001 2.001 0 0 1-.737-2.731 2.004 2.004 0 0 1 2.731-.737l52.816 30.379a1.997 1.997 0 0 0 2.373 0l.188-.123 52.629-30.256a2.001 2.001 0 0 1 1.994 3.468L67.456 63.939A5.989 5.989 0 0 1 64 65.04z"
          ></path>
        </svg>

        <span> Email </span>
      </button>
    </div>
    <div class="relative inset-x-0 bottom-0">
      <hr class="my-6 border-gray-300 w-full " />
      <div class="mt-4 text-center">
        <div class="hover:cursor-pointer text-sm">
          Sie haben noch kein Konto?
          <div class="text-blue-600" (click)="signup.emit()">Registrieren</div>
        </div>
      </div>
    </div>
  `,
})
export class SignInComponent {
  @Output() signinemail = new EventEmitter<boolean>();
  @Output() signup = new EventEmitter<boolean>();

  output() {
    this.signinemail.emit(true);
  }
}
