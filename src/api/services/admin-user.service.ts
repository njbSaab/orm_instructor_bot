// src/admin/services/admin-user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from '../../bot/entities/admin-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminRepo: Repository<AdminUser>,
  ) {}

  async getAll() {
    const users = await this.adminRepo.find();
    return users.map(({ password, ...rest }) => rest); 
  }
  async validateUser(login: string, password: string): Promise<AdminUser | null> {
    const user = await this.adminRepo.findOneBy({ login });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}