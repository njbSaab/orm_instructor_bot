import { Controller, Get, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { Message } from '../../bot/entities/message.entity';
import { MessageButtons } from '../../bot/entities/message-buttons.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getAllMessages(): Promise<Message[]> {
    return this.messageService.getAllMessagesWithButtons();
  }

  @Put(':id')
  async updateMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Message>,
  ): Promise<Message> {
    return this.messageService.updateMessage(id, updateData);
  }

  @Put(':messageId/buttons/:buttonId')
  async updateButton(
    @Param('messageId', ParseIntPipe) messageId: number,
    @Param('buttonId', ParseIntPipe) buttonId: number,
    @Body() updateData: Partial<MessageButtons>,
  ): Promise<MessageButtons> {
    return this.messageService.updateButton(messageId, buttonId, updateData);
  }
}