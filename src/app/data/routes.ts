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
  Booking,
  Bosch,
  HeyMano,
  SuccessStories,
  Impressum,
  AGB,
  Datenschutz,
}

export const routes: Record<RoutesEnum, Route> = {
  [RoutesEnum.Home]: {
    url: '',
    title: 'Individuelle Softwarelösungen für Unternehmen | couchtec',
  },
  [RoutesEnum.Auth]: { url: 'auth', title: 'Auth - couchtec' },
  [RoutesEnum.Contact]: { url: 'kontakt', title: 'Kontakt - couchtec' },
  [RoutesEnum.PriceQuote]: {
    url: 'price-quote',
    title: 'Preis Schätzung - couchtec',
  },
  [RoutesEnum.Dashboard]: { url: 'dashboard', title: 'Dashboard - couchtec' },
  [RoutesEnum.Booking]: { url: 'buchen', title: 'couchtec' },
  [RoutesEnum.Bosch]: { url: 'bosch', title: 'couchtec' },
  [RoutesEnum.HeyMano]: { url: 'heymano', title: 'couchtec' },
  [RoutesEnum.SuccessStories]: { url: 'success-stories', title: 'couchtec' },
  [RoutesEnum.Impressum]: { url: 'impressum', title: 'couchtec' },
  [RoutesEnum.Datenschutz]: { url: 'datenschutz', title: 'couchtec' },
  [RoutesEnum.AGB]: { url: 'agb', title: 'couchtec' },
};
