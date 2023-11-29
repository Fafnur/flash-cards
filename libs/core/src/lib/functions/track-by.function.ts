import { Entity } from '../types/entity.type';
import { FormChoice } from '../types/form.type';

export function trackByEntity<T extends Entity = Entity>(index: number, { uuid }: T): string {
  return uuid;
}

export function trackByFormChoice<T extends FormChoice = FormChoice>(index: number, { value }: T): string {
  return value.toString();
}
