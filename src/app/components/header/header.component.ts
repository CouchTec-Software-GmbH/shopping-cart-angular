import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { headerOptions } from '@app/data/header';
import { HeaderOption } from '@app/models/header-option';
import { SearchService } from '@services/search.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';
import { ProjectService } from '@app/services/project.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerOptions: HeaderOption[] = headerOptions;
  accountShow = false;
  name = '';
  authService = inject(AuthService);
  private authSubscription!: Subscription;
  private uuid_subscription!: Subscription;
  uuids: string[] = [];
  currentUuid: string = "";

  constructor(
    private router: Router,
    private searchService: SearchService,
    private projectService: ProjectService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.updateEmailFromCookies();
    this.authSubscription = this.authService.isAuthenticated$.subscribe(async isAuthenticated => {
      if (!isAuthenticated) {
        this.name = '';
        return;
      }
      this.updateEmailFromCookies();
    });

    this.uuid_subscription = this.projectService.getUuids().subscribe(uuids => {
      this.uuids = uuids;
      if (this.uuids.length > 0 && !this.uuids.includes(this.currentUuid)) {
        this.currentUuid = this.uuids[0];
      }
    });

    window.addEventListener('storage', this.handleStorageChange);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.uuid_subscription) {
      this.uuid_subscription.unsubscribe();
    }
    window.removeEventListener('storage', this.handleStorageChange);
  }


  handleStorageChange = (event: StorageEvent) => {
    console.log("Header storage change");
    if(event.key === 'uuid') {
      console.log("Header uuid storage change");
      this.currentUuid = localStorage.getItem('uuid') ?? this.uuids[0];
      console.log(this.currentUuid);
    }
  }

  onProjectClick(uuid: string): void {
    localStorage.setItem('uuid', uuid);
    this.currentUuid = uuid;

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'uuid',
      newValue: uuid
    }));

    this.router.navigate(['configure']);
  }

  onSearch(value: string): void {
    this.searchService.search(value);
  }

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }

  onAccountClick(): void {
    this.accountShow = !this.accountShow;
  }
  onSignInClick(): void {
    this.router.navigate(['/auth']);
    this.accountShow = false;
  }

  onSignOutClick(): void {
    this.authService.signOut();
    this.accountShow = false;
  }

  onNewProjectClick(): void {
    this.router.navigate(['/'], { queryParams: { newProject: true }});
  }

  onSettingsClick(): void {
    this.router.navigate(['/settings']);
  }

  private updateEmailFromCookies() {
    if (document.cookie.includes('sessionToken') && document.cookie.includes('email')) {
      let email = (document.cookie.split('; ').find(row => row.startsWith('email')) ?? '').split('=')[1] ?? '';
      this.name = email.split('@')[0];
      let len = this.name.length;
      this.name = `${this.name.charAt(0).toUpperCase()}${this.name.slice(1,len)}`
    } else {
      this.name = '';
    }
  }
}
