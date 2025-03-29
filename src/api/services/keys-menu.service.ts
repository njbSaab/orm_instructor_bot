import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeysMenu } from '../../bot/entities/keys-menu.entity';

@Injectable()
export class KeysMenuService {
  constructor(
    @InjectRepository(KeysMenu)
    private keysMenuRepository: Repository<KeysMenu>,
  ) {}

  // Получение всех меню с их связями
  async getAllKeysMenus(): Promise<KeysMenu[]> {
    return this.keysMenuRepository.find({
      relations: ['parent_menu', 'linked_post'], // Загружаем связанные сущности
      order: {
        created_at: 'ASC',
      },
    });
  }

  // Обновление меню по ID
  async updateKeysMenu(id: number, updateData: Partial<KeysMenu>): Promise<KeysMenu> {
    const keysMenu = await this.keysMenuRepository.findOne({
      where: { id },
      relations: ['parent_menu', 'linked_post'],
    });

    if (!keysMenu) {
      throw new NotFoundException(`KeysMenu with ID ${id} not found`);
    }

    Object.assign(keysMenu, updateData);
    keysMenu.updated_at = new Date(); // Обновляем дату изменения

    return this.keysMenuRepository.save(keysMenu);
  }
}