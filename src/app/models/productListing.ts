import { SafeUrl } from '@angular/platform-browser';

export interface Product {
  id: number;
  name: string;
  price: number
  photo: string | SafeUrl;
  description: string;
}
