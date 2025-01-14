import { Injectable } from '@angular/core';
import { AppTypeEnum } from '@app/types/AppType';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PriceQuoteService {
  private pageSubject = new BehaviorSubject<Page>(Page.AppType);
  public page$ = this.pageSubject.asObservable();

  private appTypeSubject = new BehaviorSubject<AppTypeEnum>(AppTypeEnum.Website);
  public appType$ = this.appTypeSubject.asObservable();

  public setAppType(appType: AppTypeEnum) {
    this.appTypeSubject.next(appType);
  }

  public setPage(page: Page) {
    this.pageSubject.next(page)
  }
}

export enum Page {
  AppType,
  Mode,
  Configure,
}
