import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { GroupEntity } from '@flashcards/backend/groups';
import { CardDto } from '@flashcards/cards/common';
import { Group } from '@flashcards/groups/common';

@Entity({
  name: 'cards',
})
export class CardEntity implements CardDto {
  @PrimaryColumn({ length: 36 })
  uuid!: string;

  @Column({ length: 256 })
  original!: string;

  @Column({ length: 256 })
  translation!: string;

  @Column({ nullable: true, length: 256 })
  cover!: string;

  @Column({ nullable: false, name: 'group_uuid' })
  groupUuid!: string;

  @Column()
  user!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;

  @ManyToOne(() => GroupEntity, (group) => group.cards)
  @JoinColumn({ name: 'group_uuid', referencedColumnName: 'uuid' })
  group!: Group;
}