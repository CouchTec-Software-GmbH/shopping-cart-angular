import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-mobile',
    standalone: true,
    imports: [
        RouterModule,
    ],
    templateUrl: './mobile.component.html'
})
export class MobileSection {

    constructor(
        private router: Router
    ) {

    }
    handleContactButton() {
        this.router.navigate(['kontakt'])
    }
}
