import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sogehts',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './sogehts.component.html'
})
export class SoGehtsComponent {

    constructor(
        private router: Router
    ) { }

    handleLoginButton() {
        this.router.navigate(['auth']);
        console.log("lol")
    }

    handleContactButton() {
        this.router.navigate(['kontakt'])
    }
}
