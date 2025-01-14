import { ProjectNumberInput } from '@app/models/project-number-input';
import { BoxType, ProjectOptionList } from '@app/models/project-option-list';


export const totalUsers: ProjectNumberInput = {
  id: 'totalUsers',
  title: 'Nutzer pro Monat:',
  description:
    'Um den Skalierungsaufwand abzuschätzen, müssen wir wissen wie viele Nutzer die Applikation nutzen.',
  name: 'Nutzer',
  min: 1,
  max: 99999999,
  default: 1000,
  step: 100,
};

export const concurrentUsers: ProjectNumberInput = {
  id: 'concurrentUsers',
  title: 'Anzahl gleichzeitig aktiver Nutzer:',
  description:
    'Um den Skalierungsaufwand abzuschätzen, müssen wir wissen wie viele Nutzer die Applikation gleichzeitig nutzen.',
  name: 'Nutzer',
  min: 1,
  max: 99999999,
  default: 1000,
  step: 100,
};

export const platforms: ProjectOptionList = {
  id: 'platforms',
  title: 'Platformen für Graphische Oberflächen:',
  description:
    'Falls die Anwendung eine graphische Oberfläche benötigt, wähle alle nötigen Platformen aus.',
  boxType: BoxType.Checkbox,
  options: [
    {
      id: 'web',
      name: 'Web: Nicht Responsive (keine Mobile Anwendung)',
      description: '',
      checked: false,
    },
    {
      id: 'webResponsive',
      name: 'Web: Responsive',
      description: '',
      checked: false,
    },
    {
      id: 'ios',
      name: 'Mobile: IOS',
      description: '',
      checked: false,
    },
    {
      id: 'android',
      name: 'Mobile: Android',
      description: '',
      checked: false,
    },
  ],
};

export const timeframe: ProjectNumberInput = {
  id: 'timeframe',
  title: 'Zeitraum:',
  description:
    'Um die Teamgröße abschätzen zu können, müssen wir den Zeitraum kennen, das dem Projekt zusteht.',
  name: 'Monate',
  min: 1,
  max: 120,
  default: 9,
  step: 1,
};

export const pages: ProjectNumberInput = {
  id: 'pages',
  title: 'Anzahl an Seiten:',
  description:
    'Wie viele Seiten wird es geben? Beispiele: Kontaktformular, Anmeldeformular, Inhaltsseite.',
  name: 'Seiten',
  min: 1,
  max: 9999,
  default: 1,
  step: 1,
};

export const design: ProjectOptionList = {
  id: 'design',
  title: 'Design & Benutzerfreundlichkeit:',
  description: '',
  boxType: BoxType.Radio,
  options: [
    {
      id: 'basic-design',
      name: 'Basis Funktionalität (für interne Oberflächen)',
      description: '',
      checked: false,
    },
    {
      id: 'good-design',
      name: 'Durchdachtes Design (für Kundenkontakt)',
      description: '',
      checked: false,
    },
    {
      id: 'existing-design',
      name: 'Es exisitiert bereits ein Design der Nutzeroberfläche',
      description: '',
      checked: false,
    },
  ],
};

export const infrastructure: ProjectOptionList = {
  id: 'infrastructure',
  title: 'Hosting & Infrastruktur:',
  description: '',
  boxType: BoxType.Radio,
  options: [
    {
      id: 'cloud',
      name: 'Cloud Umgebung: AWS oder Azure',
      description: '',
      checked: false,
    },
    {
      id: 'own-server',
      name: 'Eigene Server stehen zur Verfügung',
      description: '',
      checked: false,
    },
    {
      id: 'couchtec-server',
      name: 'couchtec Server',
      description: '',
      checked: false,
    },
  ],
};

export const assets: ProjectOptionList = {
  id: 'assets',
  title: 'Assets (Fotos, Videos, Ikons):',
  description: '',
  boxType: BoxType.Radio,
  options: [
    {
      id: 'own-assets',
      name: 'Eigene Assets sind schon vorhanden',
      description: '',
      checked: false,
    },
    {
      id: 'new-assets-trad',
      name: 'Wir beauftragen Fotografen/Videografen/Designer',
      description: '',
      checked: false,
    },
    {
      id: 'new-assets-ki',
      name: 'Wir erstellen die nötigen Assets via KI-Generierung',
      description: '',
      checked: false,
    },
  ]
}

export const initialStorage: ProjectNumberInput = {
  id: 'initialStorage',
  title: 'Initiale Speicherlast:',
  description: '',
  name: 'GBs',
  min: 0,
  max: 9999999,
  step: 1000,
  default: 100,
};

export const newStoragePerMonth: ProjectNumberInput = {
  id: 'initialStoragePerMonth',
  title: 'Neue Datenspeicherung pro Monat:',
  description: '',
  name: 'GBs',
  min: 0,
  max: 99999,
  step: 10,
  default: 1,
};

export const geography: ProjectOptionList = {
  id: 'geography',
  title: 'Geografische Verteilung:',
  description: '',
  boxType: BoxType.Checkbox,
  options: [
    {
      id: 'regions',
      name: 'Die Software wird in mehreren Regionen eingesetzt',
      description: '',
      checked: false,
    },
    {
      id: 'language',
      name: 'Mehrsprachige Unterstützung',
      description: '',
      checked: false,
    },
  ],
};

export const training: ProjectOptionList = {
  id: 'training',
  title: 'Training & Onboarding:',
  description: '',
  boxType: BoxType.Checkbox,
  options: [
    {
      id: 'training',
      name: 'Training für neue Nutzer',
      description: '',
      checked: false,
    },
  ],
};

export const maintenance: ProjectOptionList = {
  id: 'maintenance',
  title: 'Wartung:',
  description: '',
  boxType: BoxType.Checkbox,
  options: [
    {
      id: 'maintenance',
      name: 'Wartung der Anwendung.',
      description: '',
      checked: false,
    },
  ],
};

export const auth: ProjectOptionList = {
  id: 'auth',
  title: 'Authentifizierung:',
  description:
    'Falls die Anwendung eine Anmeldung der Nutzer benötigt, wähle alle nötigen Möglichkeiten aus.',
  boxType: BoxType.Checkbox,
  options: [
    {
      id: 'oauth',
      name: 'OAuth2.0: Google, Microsoft, Github, ...',
      description: '',
      checked: false,
    },
    {
      id: 'email',
      name: 'E-Mail',
      description: '',
      checked: false,
    },
    {
      id: 'mobileNumber',
      name: 'Telefonnummer',
      description: '',
      checked: false,
    },
    {
      id: 'otp',
      name: '2FA via One Time Passwords (OTP)',
      description: '',
      checked: false,
    },
    {
      id: 'passkey',
      name: '2FA via Passkeys (Face-ID, Fingerabdruck)',
      description: '',
      checked: false,
    },
  ],
};

export const encryption: ProjectOptionList = {
  id: 'encryption',
  title: 'Verschlüsselung:',
  description:
    'Falls die Anwendung Verschlüsselung der Daten benötigt, wähle alle nötigen Möglichkeiten aus.',
  boxType: BoxType.Radio,
  options: [
    {
      id: 'e2e',
      name: 'End-to-End',
      description: '',
      checked: false,
    },
    {
      id: 'transit',
      name: 'Während die Daten gesendet und empfangen werden',
      description: '',
      checked: false,
    },
    {
      id: 'rest',
      name: 'Beim Speichern der Daten',
      description: '',
      checked: false,
    },
  ],
};

export const userTracking: ProjectOptionList = {
  id: 'userTracking',
  title: 'Nachverfolgung des Nutzerverhaltens',
  description: '',
  boxType: BoxType.Checkbox,
  options: [
    {
      id: 'analysis',
      name: 'Integrierte Analyse des Nutzungsverhaltens',
      description: '',
      checked: false,
    },
  ],
};

export const dataSourcesWithAPI: ProjectNumberInput = {
  id: 'dataSourcesWithAPI',
  title: 'Daten Quellen mit API:',
  description: '',
  name: '',
  min: 0,
  max: 999,
  step: 1,
  default: 0,
};

export const dataSourcesWithoutAPI: ProjectNumberInput = {
  id: 'dataSourcesWithoutAPI',
  title: 'Daten Quellen ohne API:',
  description: '',
  name: '',
  min: 0,
  max: 999,
  step: 1,
  default: 0,
};

export const managementIntegration: ProjectOptionList = {
  id: 'managementIntegration',
  title: 'Drittanbieter Integrationen:',
  description: '',
  boxType: BoxType.Checkbox,
  options: [
    {
      id: 'erp',
      name: 'ERP (SAP, Oracle)',
      description: '',
      checked: false,
    },
    {
      id: 'crm',
      name: 'CRM (Salesforce)',
      description: '',
      checked: false,
    },
    {
      id: 'andereIntegration',
      name: 'andere',
      description: '',
      checked: false,
    },
  ],
};

export const managementCompliance: ProjectOptionList = {
  id: 'managementCompliance',
  title: 'Compliance Anforderungen:',
  description: '',
  boxType: BoxType.Checkbox,
  options: [
    {
      id: 'gdpr',
      name: 'GDPR',
      description: '',
      checked: false,
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      description: '',
      checked: false,
    },
    {
      id: 'iso',
      name: 'ISO',
      description: '',
      checked: false,
    },
    {
      id: 'andereCompliance',
      name: 'Andere',
      description: '',
      checked: false,
    },
  ],
};

export const dataProcessing: ProjectOptionList = {
  id: 'dataProcessing',
  title: 'Datenverarbeitung',
  description: '',
  boxType: BoxType.Radio,
  options: [
    {
      id: 'batch',
      name: 'Batch',
      description: '',
      checked: false,
    },
    {
      id: 'real-time',
      name: 'Echtzeit',
      description: '',
      checked: false,
    },
  ],
};

export const next: ProjectOptionList = {
  id: 'next',
  title: '',
  description: '',
  boxType: BoxType.Radio,
  options: [
    {
      id: '',
      name: '',
      description: '',
      checked: false,
    },
  ],
};
