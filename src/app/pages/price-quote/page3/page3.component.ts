import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mode } from '../price-quote.component';
import { RadioComponent } from '@app/components/radio/radio.component';
import { ProjectOptionList } from '@app/models/project-option-list';
import { NumberInputComponent } from '@app/components/number-input/number-input.component';
import { ProjectNumberInput } from '@app/models/project-number-input';
import { CheckboxComponent } from '@app/components/checkbox/checkbox.component';
import { AppTypeEnum } from '@app/types/AppType';
import { PriceService } from '@app/services/price.service';

@Component({
  selector: 'page3',
  standalone: true,
  imports: [RadioComponent, NumberInputComponent, CheckboxComponent],
  templateUrl: './page3.component.html',
})
export class Page3 implements OnInit {
  @Output() backToMode = new EventEmitter();
  @Input() mode = Mode.Manager;
  @Input() appType = AppTypeEnum.UserFacing;

  constructor(
    private priceService: PriceService
  ) {}

  ngOnInit(): void {
    this.priceService.updatePrice();
  }

  changeTotalUsers(value: number) {
    this.priceService.setTotalUsers(value);
  }

  changeConcurrentUsers(value: number) {
    this.priceService.setConcurrentUsers(value);
  }

  changePlatforms(platforms: string[]) {
    this.priceService.setPlatforms(platforms);
  }

  changeTimeframe(timeframe: number) {
    this.priceService.setTimeframe(timeframe);
  }

  changeDesign(design: string) {
    this.priceService.setDesign(design);
  }

  changeInfrastructure(infrastructure: string) {
    this.priceService.setInfrastructure(infrastructure);
  }

  changeInitialStorage(initialStorage: number) {
    this.priceService.setInitialStorage(initialStorage);
  }

  changeNewStoragePerMonth(newStoragePerMonth: number) {
    this.priceService.setnewStoragePerMonth(newStoragePerMonth);
  }

  changeGeography(geography: string[]) {
    this.priceService.setGeography(geography);
  }

  changeTraining(training: string[]) {
    this.priceService.setTraining(training);
  }

  changeMaintenance(maintenance: string[]) {
    this.priceService.setMaintenance(maintenance);
  }

  changeAuth(auth: string[]) {
    this.priceService.setAuth(auth);
  }

  changeEncryption(encryption: string) {
    this.priceService.setEncryption(encryption);
  }

  totalUsers: ProjectNumberInput = {
    title: 'Anzahl der Nutzer:',
    description:
      'Um den Skalierungsaufwand abzuschätzen, müssen wir wissen wie viele Nutzer die Applikation nutzen.',
    name: 'Nutzer',
    min: 1,
    max: 99999999,
    default: 1000,
    step: 100,
  };

  concurrentUsers: ProjectNumberInput = {
    title: 'Anzahl der gleichzeitigen Nutzer:',
    description:
      'Um den Skalierungsaufwand abzuschätzen, müssen wir wissen wie viele Nutzer die Applikation gleichzeitig nutzen.',
    name: 'Nutzer',
    min: 1,
    max: 99999999,
    default: 1000,
    step: 100,
  };

  platforms: ProjectOptionList = {
    title: 'Platformen für Graphische Oberflächen:',
    description:
      'Falls die Anwendung eine graphische Oberfläche benötigt, wähle alle nötigen Platformen aus.',
    options: [
      {
        id: 'web',
        name: 'Web',
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
      {
        id: 'linux',
        name: 'Desktop: Linux',
        description: '',
        checked: false,
      },
      {
        id: 'macos',
        name: 'Desktop: MacOS',
        description: '',
        checked: false,
      },
      {
        id: 'windows',
        name: 'Desktop: Windows',
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
    title: 'Neue Datenspeicherung pro Monat:',
    description: '',
    name: 'GBs',
    min: 0,
    max: 99999,
    step: 10,
    default: 1,
  };

  geography: ProjectOptionList = {
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

  next: ProjectOptionList = {
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
