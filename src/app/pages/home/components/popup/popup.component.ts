import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PopUpElementComponent } from './components/popup-element/popup-element.component';
import { State } from './components/state.enum';
import { CommonModule } from '@angular/common';
import { PopUpConfig } from '@app/models/pop-up';
import { ProjectService } from '@app/services/project.service';
import { NewProjectPopUpComponent } from './components/new-project-popup/new-project-popup.component';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [
    RouterModule,
    PopUpElementComponent,
    NewProjectPopUpComponent,
    CommonModule,
  ],
  template: `
    <ng-container *ngIf="messages[currentState] as message">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        (onClick)="handleClick()"
      >
        <app-pop-up-element
          *ngIf="message.component === 'pop-up-element'"
          (onClick)="handleClick()"
          [message]="message.text"
          [title]="message.title"
        ></app-pop-up-element>
        <app-new-project-pop-up-element
          *ngIf="message.component === 'input-pop-up-element'"
          (onClick)="handleNewProject()"
          (cancel)="handleClick()"
          [message]="message.text"
          [title]="message.title"
        ></app-new-project-pop-up-element>
      </div>
    </ng-container>
  `,
})
export class PopUpComponent implements OnInit {
  State = State;
  currentState: State = State.None;
  route = inject(ActivatedRoute);
  router = inject(Router);
  projectService = inject(ProjectService);
  @Output() popUp = new EventEmitter<boolean>();

  messages: { [key: string]: PopUpConfig } = {
    verifyEmail: {
      component: 'pop-up-element',
      text: 'Wir haben dir eine Bestätigunsemail geschickt. Um das Konto zu aktivieren, klicken Sie bitte auf den Aktivierungslink in Ihrer E-Mail.',
      title: 'Bestätige deine E-Mail',
    },
    forgotPassword: {
      component: 'pop-up-element',
      text: 'Wir haben Ihnen eine Zurücksetzungsemail geschickt. Um das Password zurückzusetzen, klicken Sie bitte auf den Zurücksetzungslink in Ihrer E-Mail.',
      title: 'Wir haben Ihnen eine E-Mail geschickt.',
    },
    registerSuccess: {
      component: 'pop-up-element',
      text: 'Sie können sich nun anmelden.',
      title: 'Ihr Konto wurde registriert.',
    },
    resetSuccess: {
      component: 'pop-up-element',
      text: 'Sie können sich nun mit Ihrem neuen Password anmelden.',
      title: 'Ihr Password wurde erfolgreich geändert.',
    },
    newProject: {
      component: 'input-pop-up-element',
      text: 'Wählen Sie einen Name für Ihr neues Projekt',
      title: 'Neues Projekt',
    },
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      Object.values(State).forEach((state) => {
        if (params[state]) {
          this.currentState = state;
          this.popUp.emit(true);
          this.removeQueryParam(state);
        }
      });
    });
  }

  handleClick(): void {
    this.currentState = State.None;
    this.popUp.emit(false);
    this.route.queryParams.subscribe((params) => {
      Object.values(State).forEach((state) => {
        if (params[state]) {
          this.currentState = state;
          this.popUp.emit(true);
          this.removeQueryParam(state);
        }
      });
    });
  }

  handleNewProject(): void {
    this.handleClick();
  }

  removeQueryParam(param: string) {
    const queryParams = { ...this.route.snapshot.queryParams };
    delete queryParams[param];
    this.router.navigate([], { queryParams });
  }
}
