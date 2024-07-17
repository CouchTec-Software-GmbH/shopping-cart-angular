import { Option } from "./option";

export interface SubSection {
  key: string;
  button: string;
  title: string;
  sub_title: string;
  options: Option[];
}
