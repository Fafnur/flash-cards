import { Entity } from '../types/entity.type';

export function trackByEntity<T extends Entity = Entity>(index: number, { uuid }: T): string {
  return uuid;
}
