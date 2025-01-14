import { AppTypeObject } from '@app/types/AppTypeObject';

const ECommerce: AppTypeObject = {
  title: 'E-Commerce',
  description:
    'Plattformen für den Online-Verkauf von Produkten oder Dienstleistungen.',
  examples: [
    'Online-Shops für physische oder digitale Waren',
    'Abonnements von Diensten oder Produkten',
    'Marktplätze',
  ],
};

const Website: AppTypeObject = {
  title: 'Geschäfts-Webseite',
  description: 'Landing Page und Informationsseiten zur Kundenakquise.',
  examples: [
    'Geschäfts Landing Page mit Produkten & Diensten',
    'Landingpages für Marketingkampagnen & Aktionen',
    'Event-Webseiten',
  ],
};

const DataAnalytics: AppTypeObject = {
  title: 'Daten und Analyse',
  description: 'Einblicke, Entscheidungshilfen und datengestützte Strategien.',
  examples: [
    'Daten erfassen, analysieren und visualisieren',
    'Nutzerverhalten Analyse: Heatmaps, Lead-Tracking',
    'Predictive Analytics für Entscheidungsfindung',
  ],
};

const ContentPlatform: AppTypeObject = {
  title: 'Content Platform',
  description: 'Anwendungen zur Verwaltung und Verteilung digitaler Inhalte.',
  examples: [
    'Video und Audio Hosting',
    'Rollen-basierter Inhaltszugang',
    'Veröffentlichen von Blogs, Artikeln und Nachrichten',
  ],
};

const Management: AppTypeObject = {
  title: 'Management',
  description:
    'Software zur Optimierung von Abläufen und Ressourcenmanagement.',
  examples: [
    'Customer Relationship Management (CRM)',
    'Enterprise Resource Planning (ERP)',
    'Bestands-, Lieferketten-, Kunden-, Mitarbeiter- und Finanzplanung.',
  ],
};

const Digitalisierung: AppTypeObject = {
  title: 'Digitalisierung & Automatisierung',
  description:
    'Lösungen zur Digitalisierung und Automatisierung traditioneller Prozesse.',
  examples: [
    'Systeme zur Automatisierung manueller Arbeitsabläufe',
    'Automatisierte Workflows zur Fehlerreduktion',
    'Einführung neuer Software',
  ],
};

export const AppTypeData = {
  ecommerce: ECommerce,
  website: Website,
  dataAnalytics: DataAnalytics,
  contentPlatform: ContentPlatform,
  management: Management,
  digitalisierung: Digitalisierung,
};
