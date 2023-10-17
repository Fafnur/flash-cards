import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Entity } from '../types/entity.type';

@Injectable()
export class EntityService<T extends Entity = Entity> {
  protected readonly state$ = new BehaviorSubject<Record<string, T> | null>(null);

  get state(): Record<string, T> {
    return this.state$.getValue() ?? {};
  }

  get entities(): T[] {
    return Object.values(this.state);
  }

  add(entity: T): void {
    const state = this.state$.getValue() ?? {};
    state[entity.uuid] = entity;
    this.state$.next(state);
  }

  delete(entity: T | string): void {
    const state = this.state$.getValue() ?? {};
    const uuid = typeof entity === 'string' ? entity : entity.uuid;

    delete state[uuid];
    this.state$.next(state);
  }
}
