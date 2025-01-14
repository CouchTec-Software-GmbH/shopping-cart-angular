import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';
import { ProjectService } from '@app/services/project.service';
import { BannerService } from '@app/services/banner.service';
import { BannerType } from '@app/types/BannerType';
import { RoutesEnum, routes } from '@app/data/routes';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  accountShow = false;
  name = '';

  verificationCode: string = '';
  resetCode: string = '';
  email: string = '';

  authService = inject(AuthService);
  private authSubscription!: Subscription;

  private uuid_subscription!: Subscription;
  uuids: string[] = [];
  currentUuid: string = '';
  isMenuOpen = false;

  private bannerSubscription!: Subscription;
  public banner: BannerType = BannerType.None;
  private bannerEmail: string = '';
  public BannerType = BannerType;

  constructor(
    private route: ActivatedRoute,
    public navigationService: NavigationService,
    private projectService: ProjectService,
    public bannerService: BannerService,
  ) { }

  getBannerEmail(): string {
    return this.bannerEmail || 'deine E-Mail';
  }

  async ngOnInit(): Promise<void> {
    this.updateEmailFromCookies();

    this.route.queryParamMap.subscribe((params) => {
      this.verificationCode = decodeURIComponent(params.get('vc') || '');
      this.email = decodeURIComponent(params.get('e') || '');

      if (this.verificationCode && this.email) {
        this.authService.setEmail(this.email);
        this.authService.register(this.verificationCode, this.email);
      }
    });
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      async (isAuthenticated) => {
        if (!isAuthenticated) {
          this.name = '';
          this.accountShow = false;
          return;
        }
        this.updateEmailFromCookies();
      },
    );

    this.bannerSubscription = this.bannerService.banner$.subscribe({
      next: (value) => (this.banner = value),
    });

    this.uuid_subscription = this.projectService
      .getUuids()
      .subscribe((uuids) => {
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
    if (this.bannerSubscription) {
      this.bannerSubscription.unsubscribe();
    }
    window.removeEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'uuid') {
      this.currentUuid = localStorage.getItem('uuid') ?? this.uuids[0];
    }
  };

  onProjectClick(uuid: string): void {
    localStorage.setItem('uuid', uuid);
    this.currentUuid = uuid;

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'uuid',
        newValue: uuid,
      }),
    );

    // this.router.navigate(['configure']);
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onAccountClick(): void {
    this.accountShow = !this.accountShow;
  }

  handleLoginButton(): void {
    this.navigationService.navigateToAuth();
    this.accountShow = false;
    this.closeMenu();
  }

  handleContactButton(): void {
    this.navigationService.navigateToContact();
    this.accountShow = false;
    this.closeMenu();
  }

  handlePriceQuoteButton(): void {
    this.navigationService.navigateToPriceQuote();
    this.accountShow = false;
    this.closeMenu();
  }

  onSignOutClick(): void {
    this.authService.signOut();
    this.closeMenu();
  }

  onNewProjectClick(): void {
    this.navigationService.navigateToHome(
      { newProject: true }
    );
    this.closeMenu();
  }

  onSettingsClick(): void {
    this.navigationService.navigateToDashboard();
    this.closeMenu();
  }

  private updateEmailFromCookies() {
    if (
      document.cookie.includes('sessionToken') &&
      document.cookie.includes('email')
    ) {
      let email =
        (
          document.cookie.split('; ').find((row) => row.startsWith('email')) ??
          ''
        ).split('=')[1] ?? '';
      this.name = email.split('@')[0];
      let len = this.name.length;
      this.name = `${this.name.charAt(0).toUpperCase()}${this.name.slice(1, len)}`;
    } else {
      this.name = '';
    }
  }
}
