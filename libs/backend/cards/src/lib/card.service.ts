import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardDto } from '@flashcards/cards/common';

import { CardEntity } from './card.entity';
import { CardCreateForm } from './card.form';

@Injectable()
export class CardService {
  constructor(@InjectRepository(CardEntity) private readonly repository: Repository<CardEntity>) {}

  async find(user?: string): Promise<CardEntity[]> {
    return this.repository.find({ where: { user } });
  }

  async findOne(uuid: string): Promise<CardEntity | null> {
    return this.repository.findOneBy({ uuid });
  }

  async create(card: CardCreateForm): Promise<CardEntity> {
    return this.repository.save(card);
  }

  async update(uuid: string, data: Partial<CardEntity>): Promise<void> {
    return this.repository.update({ uuid }, data).then();
  }

  async delete(uuid: string): Promise<void> {
    return this.repository.delete({ uuid }).then();
  }

  async save(card: CardEntity): Promise<CardEntity> {
    return this.repository.save(card);
  }

  async sync(owner: string, cards: CardDto[]): Promise<CardEntity[]> {
    await this.repository.save(cards);

    return this.find(owner);
  }
}
