import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-showcase',
    standalone: true,
    imports: [
        RouterModule,
    ],
    templateUrl: './showcase.component.html'
})
export class ShowcaseSection {
}
