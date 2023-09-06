import { Entity } from '@flash-cards/core';

export interface GroupDto {
  readonly uuid: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: string;
  readonly order: number;
  readonly cover?: string;
  readonly cards: Entity[];
}

export interface Group extends Omit<GroupDto, 'cards'> {
  readonly cards: string[];
}

export interface GroupCreate {
  readonly uuid: string;
  readonly name: string;
  readonly user: string;
  readonly cover?: string;
}

export interface GroupChange {
  readonly name?: string;
  readonly cover?: string;
  readonly order?: number;
}
