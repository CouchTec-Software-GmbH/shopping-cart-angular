import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnDestroy {
  private uuids: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private authService = inject(AuthService);
  private authSubscription!: Subscription;

  constructor() {
      this.authSubscription = this.authService.isAuthenticated$.subscribe(async isAuthenticated => {
      if (!isAuthenticated) return;
      let uuids = await this.authService.getUuids();
      if ( uuids.length > 0 ) {
        let local_uuids = this.uuids.getValue()
        local_uuids.forEach(uuid => {
          this.authService.addUuid(uuid);
        });
        let new_uuids = uuids.concat(local_uuids);
        this.uuids.next(new_uuids);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  removeUuid(value: string) {
    const new_uuids = this.uuids.getValue().filter(uuid => uuid != value);
    this.uuids.next(new_uuids);
  }

  addUuid(value: string) {
    const uuids = this.uuids.getValue();
    uuids.push(value);
    this.uuids.next(uuids);
  }

  setUuids(value: string[]) {
    this.uuids.next(value);
  }

  getUuids() {
    return this.uuids.asObservable();
  }

  clearUuids() {
    this.uuids.next([]);
  }
}
