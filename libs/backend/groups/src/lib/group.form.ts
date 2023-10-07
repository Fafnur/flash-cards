import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { GroupChange, GroupCreate } from '@flashcards/groups/common';

export class GroupCreateForm implements GroupCreate {
  @IsNotEmpty()
  @IsString()
  @Length(36, 36)
  uuid!: string;

  @IsString()
  @Length(36, 36)
  user!: string;

  @IsNotEmpty()
  @Length(1, 60)
  name!: string;

  @IsString()
  @Length(1, 256)
  @IsOptional()
  cover?: string;

  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  original!: string;

  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  translation!: string;
}

export class GroupChangeForm implements GroupChange {
  @Length(1, 60)
  @IsOptional()
  name?: string;

  @IsString()
  @Length(1, 256)
  @IsOptional()
  cover?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  original!: string;

  @IsNotEmpty()
  @Length(1, 256)
  @IsOptional()
  translation!: string;
}
