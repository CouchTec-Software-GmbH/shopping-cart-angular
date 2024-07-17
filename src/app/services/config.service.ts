import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get_http_header, get_session_token_from_cookie } from '@app/utils/utils';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Section } from '@app/models/section';
import { SubSection } from '@app/models/sub-section';
import { Option } from '@app/models/option';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = `/api/`;
  private configSubject = new BehaviorSubject<ConfigData | null>(null);
  private sections: Section[] = [];
  private configLoaded: Promise<void>;

  constructor(private http: HttpClient) {
    this.configLoaded = this.initializeConfig();
  }

  async initializeConfig(): Promise<any> {
    try {
      let session_token = get_session_token_from_cookie();
      const response = await firstValueFrom(this.http.get<ConfigData>(`${this.apiUrl}config`, get_http_header(session_token ?? "")));

      if(response && response.sections) {
        this.parseConfig(response.sections);
      }
      this.configSubject.next(response);
    } catch (error) {
      console.error('Failed to initialize config:', error);
      this.configSubject.next(null);
    }
  }

  async waitForConfig(): Promise<void> {
    return this.configLoaded;
  }

  private parseConfig(sections: Section[]): void {
    this.sections = sections.map(sectionObj => {
      const [sectionKey, sectionValue] = Object.entries(sectionObj)[0];
      return {
        key: sectionKey,
        ...sectionValue,
        sub_sections: sectionValue.sub_sections.map((subSectionObj: any) => {
          const [subSectionKey, subSectionValue] = Object.entries(subSectionObj)[0] as [string, any];
          return {
            key: subSectionKey,
            ...subSectionValue,
            options: Object.entries(subSectionValue.options).map(([optionKey, optionValue]) => ({
              key: optionKey,
              ...optionValue as object
            }))
          };
        })
      };
    });
  }

  getConfig() {
    return this.configSubject.asObservable();
  }

  getSections() {
    return this.sections;
  }

  getSection(key: string) {
    return this.sections.find(section => section.key === key);
  }

  getSubSection(section: string, sub_section: string): SubSection | undefined {
    const foundSection = this.getSection(section);
    return foundSection?.sub_sections.find(subSection => subSection.key === sub_section);
  }

  getOptions(section: string, sub_section: string): Option[] | undefined {
    const foundSubSection = this.getSubSection(section, sub_section);
    return foundSubSection?.options;
  }

  createDefaultProjectData(): any {
    const defaultData: any = {};
    this.sections.forEach((section) => {
      defaultData[section.key] = {};
      section.sub_sections.forEach((subSection) => {
        defaultData[section.key][subSection.key] = {};
        let options: string[] = [];

        let button = subSection.button;
        if (button === 'checkbox') {
          subSection.options.forEach(option => {
            if(option.checked) {
              options.push(option.key);
            }
          });
        defaultData[section.key][subSection.key] = options;
        } else {
          let found = false;
          subSection.options.forEach(option => {
            if(option.checked) {
              defaultData[section.key][subSection.key] = option.key
              found = true;
            }
          });
          if (!found) {
              defaultData[section.key][subSection.key] = ""
          }
        }
      });
    });
    return defaultData;
  }
}

interface ConfigData {
  sections: Section[];
}
