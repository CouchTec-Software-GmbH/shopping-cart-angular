import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RadioComponent } from '@app/components/radio/radio.component';
import { ProjectOptionList } from '@app/models/project-option-list';
import { NumberInputComponent } from '@app/components/number-input/number-input.component';
import { ProjectNumberInput } from '@app/models/project-number-input';
import { CheckboxComponent } from '@app/components/checkbox/checkbox.component';
import { AppTypeEnum } from '@app/types/AppType';
import { PriceService } from '@app/services/price.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'configure',
  standalone: true,
  imports: [
    RadioComponent,
    NumberInputComponent,
    CheckboxComponent,
    CommonModule,
  ],
  templateUrl: './configure.component.html',
})
export class Configure implements OnInit {
  @Output() backToAppType = new EventEmitter();
  @Input() appType = AppTypeEnum.Website;
  AppTypeEnum = AppTypeEnum;

  constructor(public priceService: PriceService) { }

  ngOnInit(): void {
    this.priceService.updatePrice();
  }

  totalUsers: ProjectNumberInput = {
    title: 'Nutzer pro Monat:',
    description:
      'Um den Skalierungsaufwand abzuschätzen, müssen wir wissen wie viele Nutzer die Applikation nutzen.',
    name: 'Nutzer',
    min: 1,
    max: 99999999,
    default: 1000,
    step: 100,
  };

  concurrentUsers: ProjectNumberInput = {
    title: 'Anzahl gleichzeitig aktiver Nutzer:',
    description:
      'Um den Skalierungsaufwand abzuschätzen, müssen wir wissen wie viele Nutzer die Applikation gleichzeitig nutzen.',
    name: 'Nutzer',
    min: 1,
    max: 99999999,
    default: 1000,
    step: 100,
  };

  platforms: ProjectOptionList = {
    id: 'platforms',
    title: 'Platformen für Graphische Oberflächen:',
    description:
      'Falls die Anwendung eine graphische Oberfläche benötigt, wähle alle nötigen Platformen aus.',
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

  timeframe: ProjectNumberInput = {
    title: 'Zeitraum:',
    description:
      'Um die Teamgröße abschätzen zu können, müssen wir den Zeitraum kennen, das dem Projekt zusteht.',
    name: 'Monate',
    min: 1,
    max: 120,
    default: 9,
    step: 1,
  };

  design: ProjectOptionList = {
    id: 'design',
    title: 'Design & Benutzerfreundlichkeit:',
    description: '',
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

  infrastructure: ProjectOptionList = {
    id: 'infrastructure',
    title: 'Hosting & Infrastruktur:',
    description: '',
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

  initialStorage: ProjectNumberInput = {
    title: 'Initiale Speicherlast:',
    description: '',
    name: 'GBs',
    min: 0,
    max: 9999999,
    step: 1000,
    default: 100,
  };

  newStoragePerMonth: ProjectNumberInput = {
    // id: 'newStoragePerMonth',
    title: 'Neue Datenspeicherung pro Monat:',
    description: '',
    name: 'GBs',
    min: 0,
    max: 99999,
    step: 10,
    default: 1,
  };

  geography: ProjectOptionList = {
    id: 'geography',
    title: 'Geografische Verteilung:',
    description: '',
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

  training: ProjectOptionList = {
    id: 'training',
    title: 'Training & Onboarding:',
    description: '',
    options: [
      {
        id: 'training',
        name: 'Training für neue Nutzer',
        description: '',
        checked: false,
      },
    ],
  };

  maintenance: ProjectOptionList = {
    id: 'maintenance',
    title: 'Wartung:',
    description: '',
    options: [
      {
        id: 'maintenance',
        name: 'Wartung der Anwendung.',
        description: '',
        checked: false,
      },
    ],
  };

  auth: ProjectOptionList = {
    id: 'auth',
    title: 'Authentifizierung:',
    description:
      'Falls die Anwendung eine Anmeldung der Nutzer benötigt, wähle alle nötigen Möglichkeiten aus.',
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

  encryption: ProjectOptionList = {
    id: 'encryption',
    title: 'Verschlüsselung:',
    description:
      'Falls die Anwendung Verschlüsselung der Daten benötigt, wähle alle nötigen Möglichkeiten aus.',
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

  userTracking: ProjectOptionList = {
    id: 'userTracking',
    title: 'Nachverfolgung des Nutzerverhaltens',
    description: '',
    options: [
      {
        id: 'analysis',
        name: 'Integrierte Analyse des Nutzungsverhaltens',
        description: '',
        checked: false,
      },
    ],
  };

  dataSourcesWithAPI: ProjectNumberInput = {
    title: 'Daten Quellen mit API:',
    description: '',
    name: '',
    min: 0,
    max: 999,
    step: 1,
    default: 0,
  };

  dataSourcesWithoutAPI: ProjectNumberInput = {
    title: 'Daten Quellen ohne API:',
    description: '',
    name: '',
    min: 0,
    max: 999,
    step: 1,
    default: 0,
  };

  managementIntegration: ProjectOptionList = {
    id: 'managementIntegration',
    title: 'Drittanbieter Integrationen:',
    description: '',
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

  managementCompliance: ProjectOptionList = {
    id: 'managementCompliance',
    title: 'Compliance Anforderungen:',
    description: '',
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

  dataProcessing: ProjectOptionList = {
    id: 'dataProcessing',
    title: 'Datenverarbeitung',
    description: '',
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

  next: ProjectOptionList = {
    id: 'next',
    title: '',
    description: '',
    options: [
      {
        id: '',
        name: '',
        description: '',
        checked: false,
      },
    ],
  };
}