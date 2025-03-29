// src/admin/controllers/admin-user.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AdminUserService } from '../services/admin-user.service';

@Controller('api/admin-users')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  getAll() {
    return this.adminUserService.getAll();
  }
}