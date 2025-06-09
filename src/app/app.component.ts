import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <main>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const mainElement = this.elementRef.nativeElement.querySelector('main');
        if (mainElement) {
          mainElement.scrollTop = 0;
        }
      });
  }
}
