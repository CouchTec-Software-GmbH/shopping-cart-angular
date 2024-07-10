import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get_http_header, get_session_token_from_cookie } from '@app/utils/utils';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = `/api/`;
  private configSubject = new BehaviorSubject<ConfigData | null>(null);
  private sectionsMap: Map<string, Section> = new Map();

  constructor(private http: HttpClient) {
    this.initializeConfig();
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

  private parseConfig(sections: { [key: string]: Section }): void {
    Object.entries(sections).forEach(([key, value]) => {
      const subSectionMap = new Map<string, SubSection>();

      Object.entries(value.sub_sections).forEach(([subKey, subValue]) => {
        const optionsMap = new Map<string, Option>();

        Object.entries(subValue.options as { [key: string]: Option }).forEach(([optKey, optValue]) => {
          optionsMap.set(optKey, optValue);
        });

        subSectionMap.set(subKey, { ...subValue, options: optionsMap });
      });

      this.sectionsMap.set(key, { ...value, sub_sections: subSectionMap });
    });
  }

  getConfig() {
    return this.configSubject.asObservable();
  }

  getSections() {
    return this.sectionsMap;
  }

  getSection(key: string) {
    return this.sectionsMap.get(key);
  }

  getSubSection(section: string, sub_section: string): SubSection | undefined {
    return this.sectionsMap.get(section)?.sub_sections.get(sub_section);
  }

  getOptions(section: string, sub_section: string): Map<string, Option> | undefined {
    return this.getSubSection(section, sub_section)?.options;
  }

  createDefaultProjectData(): any {
    const defaultData: any = {};
    this.sectionsMap.forEach((sectionValue, sectionKey) => {
      defaultData[sectionKey] = {};
      sectionValue.sub_sections.forEach((subSectionValue, subSectionKey) => {
        let button = subSectionValue.button;
        if (button === 'radio') {
          const firstOption = subSectionValue.options.keys().next().value;
          defaultData[sectionKey][subSectionKey] = firstOption || '';
        } else {
          defaultData[sectionKey][subSectionKey] = [];
        }
      });
    });
    return defaultData;
  }
}

interface ConfigData {
  sections: {
    [key: string]: Section;
  };
}

interface Section {
  display_name: string;
  title: string;
  sub_title: string;
  sub_sections: Map<string, SubSection>;
}

interface SubSection {
  button: string;
  title: string;
  sub_title: string;
  options: Map<string, Option>;
}

interface Option {
  display_name: string;
  factor: number;
}
