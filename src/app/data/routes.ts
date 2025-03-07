export interface Route {
  url: string;
  title: string;
}

export enum RoutesEnum {
  Home,
  Auth,
  Contact,
  PriceQuote,
  Dashboard,
  Calendar,
}

export const routes: Record<RoutesEnum, Route> = {
  [RoutesEnum.Home]: { url: '', title: 'Home - couchtec' },
  [RoutesEnum.Auth]: { url: 'auth', title: 'Auth - couchtec' },
  [RoutesEnum.Contact]: { url: 'kontakt', title: 'Kontakt - couchtec' },
  [RoutesEnum.PriceQuote]: {
    url: 'price-quote',
    title: 'Preis Schätzung - couchtec',
  },
  [RoutesEnum.Dashboard]: { url: 'dashboard', title: 'Dashboard - couchtec' },
  [RoutesEnum.Calendar]: { url: 'kalender', title: 'Kalendar - couchtec' },
};
