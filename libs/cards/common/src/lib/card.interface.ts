export interface Card {
  readonly uuid: string;
  readonly original: string;
  readonly translation: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: string;
  readonly learned: boolean;
  readonly groupUuid: string;
  readonly cover?: string;
}

export interface CardNew {
  readonly uuid: string;
  readonly original: string;
  readonly translation: string;
}

export type CardCreate = Omit<Card, 'createdAt' | 'updatedAt' | 'learned'>;

export type CardChange = Partial<Omit<Card, 'createdAt' | 'updatedAt' | 'user' | 'groupUuid'>>;

export const CARDS_KEY = 'cards';

export interface CardLearn {
  readonly card: Card;
  readonly learned: boolean;
}
