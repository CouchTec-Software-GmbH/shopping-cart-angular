import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { headerOptions } from '@app/data/header';
import { HeaderOption } from '@app/models/header-option';
import { AuthService } from '@app/services/auth.service';
import { ProjectService } from '@app/services/project.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './hero.component.html'
})
export class HeroComponent {
    headerOptions: HeaderOption[] = headerOptions;
    accountShow = false;
    name = '';
    authService = inject(AuthService);
    private authSubscription!: Subscription;
    private uuid_subscription!: Subscription;
    uuids: string[] = [];
    currentUuid: string = "";
    isMenuOpen = false;

    constructor(
        private router: Router,
        private projectService: ProjectService
    ) { }

    handleLoginButton() {
        this.router.navigate(['auth']);
    }
    handleContactButton() {
        this.router.navigate(['kontakt'])
    }

    async ngOnInit(): Promise<void> {
        this.updateEmailFromCookies();
        this.authSubscription = this.authService.isAuthenticated$.subscribe(async isAuthenticated => {
            if (!isAuthenticated) {
                console.log("Not logged in")
                this.name = '';
                this.accountShow = false;
                return;
            }
            console.log("logged in")
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
        if (event.key === 'uuid') {
            this.currentUuid = localStorage.getItem('uuid') ?? this.uuids[0];
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
        this.closeMenu()
    }

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
        console.log("toogle menu");
    }

    closeMenu(): void {
        this.isMenuOpen = false;
    }

    onAccountClick(): void {
        this.accountShow = !this.accountShow;
    }

    onSignInClick(): void {
        this.router.navigate(['/auth']);
        this.accountShow = false;
        this.closeMenu()
    }

    onSignOutClick(): void {
        this.authService.signOut();
        this.closeMenu()
    }

    onNewProjectClick(): void {
        this.router.navigate(['/'], { queryParams: { newProject: true } });
        this.closeMenu()
    }

    onSettingsClick(): void {
        this.router.navigate(['/dashboard']);
        this.closeMenu()
    }

    private updateEmailFromCookies() {
        if (document.cookie.includes('sessionToken') && document.cookie.includes('email')) {
            let email = (document.cookie.split('; ').find(row => row.startsWith('email')) ?? '').split('=')[1] ?? '';
            console.log("email: ", email);
            this.name = email.split('@')[0];
            let len = this.name.length;
            this.name = `${this.name.charAt(0).toUpperCase()}${this.name.slice(1, len)}`
            console.log("name: ", this.name);
        } else {
            this.name = '';
        }

    }
}
