export interface Group {
  readonly uuid: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: string;
  readonly order: number;
  readonly cover?: string;
}

export type GroupCreate = Omit<Group, 'createdAt' | 'updatedAt'>;

export type GroupChange = Partial<Omit<Group, 'createdAt' | 'updatedAt' | 'uuid' | 'user' | 'groupUuid'>>;

export const GROUPS_KEY = 'groups';
