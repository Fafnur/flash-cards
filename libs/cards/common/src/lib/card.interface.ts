export interface Card {
  readonly uuid: string;
  readonly original: string;
  readonly translation: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: string;
  readonly repeated: string[];
  readonly groupUuid: string;
  readonly cover?: string;
}

export type CardCreate = Omit<Card, 'createdAt' | 'updatedAt' | 'repeated'>;

export type CardChange = Partial<Omit<Card, 'createdAt' | 'updatedAt' | 'uuid' | 'user' | 'groupUuid'>>;

export const CARDS_KEY = 'cards';
