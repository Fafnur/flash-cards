import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { CardEntity } from '@flashcards/backend/cards';
import { Card } from '@flashcards/cards/common';
import { Group } from '@flashcards/groups/common';

@Entity({
  name: 'groups',
})
export class GroupEntity implements Group {
  @PrimaryColumn({ length: 36 })
  uuid!: string;

  @Column()
  name!: string;

  @Column({ nullable: true, length: 256 })
  cover?: string;

  @Column()
  user!: string;

  @Column()
  order!: number;

  @Column({ length: 256, nullable: true })
  original!: string;

  @Column({ length: 256, nullable: true })
  translation!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;

  @OneToMany(() => CardEntity, (card) => card.group)
  cards!: Card[];
}
