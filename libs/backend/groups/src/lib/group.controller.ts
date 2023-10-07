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

import { formExceptionFactory, JwtAuthGuard } from '@flashcards/backend/core';
import { Entity } from '@flashcards/core';
import { Group } from '@flashcards/groups/common';

import { GroupChangeForm, GroupCreateForm } from './group.form';
import { GroupService } from './group.service';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  )
  async create(@Request() req: { user: Entity }, @Body() form: GroupCreateForm): Promise<Group> {
    return this.service.create({
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
  async change(@Request() req: { user: Entity }, @Param() params: { uuid: string }, @Body() form: GroupChangeForm): Promise<Group> {
    const group = (await this.service.findOne(params.uuid)) as Group;
    if (!group) {
      throw new BadRequestException(`Group #${params.uuid} not found`);
    }

    return this.service.save({ ...group, ...form });
  }

  @Get()
  async load(@Request() req: { user: Entity }): Promise<Group[]> {
    return this.service.find(req.user.uuid);
  }

  @Delete(':uuid')
  async delete(@Request() req: { user: Entity }, @Param() params: { uuid: string }): Promise<void> {
    const group = await this.service.findOne(params.uuid);
    if (!group) {
      throw new BadRequestException(`Group #${params.uuid} not found`);
    }

    return this.service.delete(params.uuid);
  }

  @Post('sync')
  async sync(@Request() req: { user: Entity }, @Body() groups: Group[]): Promise<Group[]> {
    return this.service.sync(req.user.uuid, groups);
  }
}
