// src/api/controllers/user.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../../bot/entities/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}