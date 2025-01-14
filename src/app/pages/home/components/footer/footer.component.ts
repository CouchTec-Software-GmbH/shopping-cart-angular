import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  currentYear: number = 2024;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
