import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../bot/entities/message.entity';
import { MessageButtons } from '../../bot/entities/message-buttons.entity';
import { MessageButtonsList } from '../../bot/entities/message-buttons-list.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(MessageButtons)
    private buttonRepository: Repository<MessageButtons>,
    @InjectRepository(MessageButtonsList)
    private buttonListRepository: Repository<MessageButtonsList>,
  ) {}

  async getAllMessagesWithButtons(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['buttons', 'buttons.button'], // Загружаем buttons и связанные MessageButtons
      order: {
        created_at: 'ASC',
      },
    });
  }

  async updateMessage(id: number, updateData: Partial<Message>): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['buttons', 'buttons.button'],
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    Object.assign(message, updateData);
    return this.messageRepository.save(message);
  }

  async updateButton(messageId: number, buttonId: number, updateData: Partial<MessageButtons>): Promise<MessageButtons> {
    // Находим запись в MessageButtonsList
    const buttonList = await this.buttonListRepository.findOne({
      where: { message: { id: messageId }, button: { id: buttonId } },
      relations: ['button'],
    });

    if (!buttonList || !buttonList.button) {
      throw new NotFoundException(`Button with ID ${buttonId} not found for message ${messageId}`);
    }

    // Обновляем данные кнопки
    const button = buttonList.button;
    Object.assign(button, updateData);
    button.updated_at = new Date();

    // Сохраняем изменения
    return this.buttonRepository.save(button);
  }
}