import { Injectable } from '@angular/core';
import { BannerType } from '@app/types/BannerType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private bannerSubject = new BehaviorSubject<BannerType>(BannerType.None);
  private bannerEmailSubject = new BehaviorSubject<string>('');

  banner$ = this.bannerSubject.asObservable();
  bannerEmail$ = this.bannerEmailSubject.asObservable();

  setBanner(banner: BannerType) {
    this.bannerSubject.next(banner);
  }

  clearBanner() {
    this.bannerSubject.next(BannerType.None);
  }

  setBannerEmail(email: string) {
    this.bannerEmailSubject.next(email);
  }
}
