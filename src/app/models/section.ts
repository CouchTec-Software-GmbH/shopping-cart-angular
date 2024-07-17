import { SubSection } from "./sub-section";

export interface Section {
  key: string;
  display_name: string;
  title: string;
  sub_title: string;
  sub_sections: SubSection[];
}
