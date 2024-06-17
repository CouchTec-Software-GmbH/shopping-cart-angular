import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  template: `
<div class="flex h-screen flex-col justify-between border-e bg-white ">
  <div class="px-0 py-6">


    <ul class="mt-6 space-y-1 px-8">

      <li>
        <a
          (click)="onStateChange('projects')"
            [ngClass]="{ 'bg-gray-100': state === 'projects' }"
          class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"
        >
          Projects
        </a>
      </li>

      <li>
        <a
          (click)="onStateChange('account')"
            [ngClass]="{ 'bg-gray-100': state === 'account' }"
          class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer"
        >
          Account
        </a>
      </li>

    </ul>
  </div>

  <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">


      <div>
        <p class="text-xs">
          <strong class="block font-medium">{{ name }}</strong>

          <span> {{ email }} </span>
        </p>
      </div>
    </a>
  </div>
</div>
  `,
})
export class SideMenuComponent implements OnInit {
  email: string = "";
  name: string = "";
  @Input() state: string = "projects";
  @Output() stateChange = new EventEmitter<string>();

  ngOnInit(): void {
      this.email = document.cookie.split(';').find(row => row.trim().startsWith('email'))?.split('=')[1].trim() ?? "";
      let name = this.email.split('@')[0];
      this.name = `${name.charAt(0).toUpperCase()}${name.substring(1, name.length)}`;
  }

  onStateChange(state: string) {
    this.stateChange.emit(state);
    this.state = state
  }

}
