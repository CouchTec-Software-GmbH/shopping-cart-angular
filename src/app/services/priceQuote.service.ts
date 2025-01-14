import { Injectable } from '@angular/core';
import { AppTypeEnum } from '@app/types/AppType';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PriceQuoteService {
  private pageSubject = new BehaviorSubject<Page>(Page.AppType);
  page$ = this.pageSubject.asObservable();

  private appTypeSubject = new BehaviorSubject<AppTypeEnum>(AppTypeEnum.Website);
  appType$ = this.appTypeSubject.asObservable();
}

export enum Page {
  AppType,
  Mode,
  Configure,
}
