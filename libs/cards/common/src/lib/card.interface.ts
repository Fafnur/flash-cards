import { Entity } from '@flash-cards/core';

export interface CardDto {
  readonly uuid: string;
  readonly original: string;
  readonly translation: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: string;
  readonly cover?: string;
  readonly groupUuid: string;
  readonly group: Entity;
}

export type Card = Omit<CardDto, 'group'>;

export interface CardCreate {
  readonly uuid: string;
  readonly user: string;
  readonly groupUuid: string;
  readonly original: string;
  readonly translation: string;
  readonly cover?: string;
}

export interface CardChange {
  readonly groupUuid?: string;
  readonly original?: string;
  readonly translation?: string;
  readonly cover?: string;
}
