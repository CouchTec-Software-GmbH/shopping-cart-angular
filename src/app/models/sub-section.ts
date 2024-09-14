import { Option } from "./option";

export interface SubSection {
  key: string;
  typ: string;
  title: string;
  sub_title: string;
  options: Option[];
}
