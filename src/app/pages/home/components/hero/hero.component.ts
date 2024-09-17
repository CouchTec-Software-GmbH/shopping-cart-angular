import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './hero.component.html'
})
export class HeroComponent {

    constructor(
        private router: Router
    ) { }

    handleLoginButton() {
        this.router.navigate(['auth']);
    }
    handleContactButton() {
        this.router.navigate(['kontakt'])
    }
}
