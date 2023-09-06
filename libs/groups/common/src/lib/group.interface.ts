export interface Group {
  readonly uuid: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly user: string;
  readonly order: number;
  readonly cover?: string;
}

export interface GroupCreate {
  readonly uuid: string;
  readonly name: string;
  readonly cover?: string;
  readonly order?: number;
}

export type GroupChange = Partial<Omit<GroupCreate, 'uuid'>>;
