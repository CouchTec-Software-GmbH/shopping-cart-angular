import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-contact-section',
    standalone: true,
    imports: [
        RouterModule,
    ],
    templateUrl: './contact-section.component.html'
})
export class ContactSection {

    constructor(
        private router: Router
    ) {

    }
    handleContactButton() {
        this.router.navigate(['kontakt'])
    }
}
