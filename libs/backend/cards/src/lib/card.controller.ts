import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { formExceptionFactory, JwtAuthGuard } from '@flash-cards/backend/core';
import { CardDto } from '@flash-cards/cards/common';
import { Entity } from '@flash-cards/core';

import { CardChangeForm, CardCreateForm } from './card.form';
import { CardService } from './card.service';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(private readonly service: CardService) {}

  @Get()
  async load(@Request() req: { user: Entity }): Promise<CardDto[]> {
    return await this.service.find(req.user.uuid);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  )
  async create(@Request() req: { user: Entity }, @Body() form: CardCreateForm): Promise<CardDto> {
    return await this.service.create({
      ...form,
      user: req.user.uuid,
    });
  }

  @Patch(':uuid')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  )
  async change(@Request() req: { user: Entity }, @Param() params: { uuid: string }, @Body() form: CardChangeForm): Promise<CardDto> {
    const card = await this.service.findOne(params.uuid);
    if (!card) {
      throw new BadRequestException(`Card #${params.uuid} not found`);
    }

    return await this.service.save({ ...card, ...form, user: req.user.uuid });
  }

  @Delete(':uuid')
  async delete(@Request() req: { user: Entity }, @Param() params: { uuid: string }): Promise<void> {
    const card = await this.service.findOne(params.uuid);
    if (!card) {
      throw new BadRequestException(`Card #${params.uuid} not found`);
    }

    return await this.service.delete(params.uuid);
  }

  @Post('sync')
  async sync(@Request() req: { user: Entity }, @Body() groups: CardDto[]): Promise<CardDto[]> {
    return await this.service.sync(req.user.uuid, groups);
  }
}
