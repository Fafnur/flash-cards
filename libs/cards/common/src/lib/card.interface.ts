export interface Card {
  readonly uuid: string;
  readonly groupUuid: string;
  readonly original: string;
  readonly translation: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: string;
  readonly cover?: string;
}

export interface CardCreate {
  readonly uuid: string;
  readonly groupUuid: string;
  readonly original: string;
  readonly translation: string;
  readonly cover?: string | null;
}

export type CardChange = Partial<Omit<CardCreate, 'uuid'>>;
