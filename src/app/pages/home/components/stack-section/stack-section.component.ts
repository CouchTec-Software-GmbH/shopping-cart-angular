import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-stack-section',
    standalone: true,
    imports: [
        RouterModule,
    ],
    templateUrl: './stack-section.component.html'
})
export class StackSection {

    constructor(
        private router: Router
    ) {

    }
    handleContactButton() {
        this.router.navigate(['kontakt'])
    }
}
