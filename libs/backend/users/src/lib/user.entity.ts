import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User, UserStatus } from '@flashcards/users/common';

@Entity({
  name: 'users',
})
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Created,
  })
  status!: UserStatus;

  @Column({ unique: true })
  email!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;
}
