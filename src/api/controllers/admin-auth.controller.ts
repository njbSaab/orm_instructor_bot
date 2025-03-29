// src/admin/controllers/admin-auth.controller.ts
import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { AdminUserService } from '../services/admin-user.service';

@Controller('api/admin-auth')
export class AdminAuthController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post('login')
  async login(@Body() body: { login: string; password: string }) {
    const user = await this.adminUserService.validateUser(body.login, body.password);
    if (!user) throw new NotFoundException('Invalid login or password');

    return {
      id: user.id,
      login: user.login,
      role: user.role,
    };
  }
}