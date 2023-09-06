import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { CardChange, CardCreate } from '@flash-cards/cards/common';

export class CardCreateForm implements CardCreate {
  @IsNotEmpty()
  @IsString()
  @Length(36, 36, {
    context: { errorCode: 'isLength' },
  })
  uuid!: string;

  @IsNotEmpty()
  @Length(1, 256)
  original!: string;

  @IsNotEmpty()
  @Length(1, 256)
  translation!: string;

  @IsNotEmpty()
  @IsString()
  @Length(36, 36)
  groupUuid!: string;

  @IsNotEmpty()
  @IsString()
  @Length(36, 36)
  user!: string;

  @IsString()
  @Length(1, 256)
  @IsOptional()
  cover?: string;
}

export class CardChangeForm implements CardChange {
  @Length(1, 256)
  @IsOptional()
  original!: string;

  @Length(1, 256)
  @IsOptional()
  translation!: string;

  @IsString()
  @Length(36, 36)
  @IsOptional()
  groupUuid!: string;

  @IsString()
  @Length(1, 256)
  @IsOptional()
  cover?: string;
}
