import { HttpHeaders } from '@angular/common/http';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export type WritableKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export function changeProperty<T extends object, K extends WritableKeys<T>>(
  targetObject: T,
  property: K,
  value: T[K]
) {

  const target = targetObject[property];

  if (typeof target === 'function') {
    (target as Function)(value);
  } else {
    targetObject[property] = value;
  }

  if ('updatePrice' in targetObject && typeof targetObject['updatePrice'] === 'function') {
    (targetObject['updatePrice'] as () => void)();
  }
}

export function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

export function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    if (!current[keys[i]]) {
      return null;
    }
    current = current[keys[i]];
  }
  return current;
}

export function emailDomainValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    if (!email) {
      return null;
    }
    const parts: string[] = email.split('@');
    const domain: string = parts[1];
    const name: string = parts[0];
    if (
      !name ||
      !domain ||
      !domain.includes('.') ||
      domain.split('.').length < 2 ||
      !domain.split('.')[0] ||
      !domain.split('.')[1]
    ) {
      return { invalidDomain: true };
    }
    return null;
  };
}

export function get_email_from_cookie() {
  return document.cookie
    .split(';')
    .find((row) => row.trim().startsWith('email'))
    ?.split('=')[1]
    .trim();
}

export function get_session_token_from_cookie() {
  return document.cookie
    .split(';')
    .find((row) => row.trim().startsWith('sessionToken'))
    ?.split('=')[1]
    .trim();
}

export function get_http_header(session_token: string) {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session_token}`,
    }),
  };
}

export function get_basic_http_header() {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
}
