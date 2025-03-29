import { Controller, Get, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { KeysMenuService } from '../services/keys-menu.service';
import { KeysMenu } from '../../bot/entities/keys-menu.entity';

@Controller('keys-menu')
export class KeysMenuController {
  constructor(private readonly keysMenuService: KeysMenuService) {}

  @Get()
  async getAllKeysMenus(): Promise<KeysMenu[]> {
    return this.keysMenuService.getAllKeysMenus();
  }

  @Put(':id')
  async updateKeysMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<KeysMenu>,
  ): Promise<KeysMenu> {
    return this.keysMenuService.updateKeysMenu(id, updateData);
  }
}