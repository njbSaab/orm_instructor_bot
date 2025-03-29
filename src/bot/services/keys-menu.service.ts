import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeysMenu } from '../entities/keys-menu.entity';

@Injectable()
export class KeysMenuService {
  constructor(
    @InjectRepository(KeysMenu)
    private readonly keysMenuRepository: Repository<KeysMenu>,
  ) {}

  async getButtonByName(name: string): Promise<KeysMenu | null> {
    return this.keysMenuRepository.findOne({
      where: { name },
      relations: ['linked_post'], // Подгружаем отношение linked_post
    });
  }

  async getButtonById(id: number): Promise<KeysMenu | null> {
    return this.keysMenuRepository.findOne({
      where: { id },
      relations: ['linked_post'], // Подгружаем отношение linked_post
    });
  }
}