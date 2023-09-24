export interface Group {
  readonly uuid: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: string;
  readonly order: number;
  readonly cover?: string;
  readonly original?: string;
  readonly translation?: string;
}

export type GroupCreate = Omit<Group, 'createdAt' | 'updatedAt' | 'order'>;

export type GroupChange = Partial<Omit<Group, 'createdAt' | 'updatedAt' | 'uuid' | 'user'>>;

export const GROUPS_KEY = 'groups';
