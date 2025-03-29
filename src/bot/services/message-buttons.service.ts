import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageButtons } from '../entities/message-buttons.entity';
import { MessageButtonsList } from '../entities/message-buttons-list.entity';

@Injectable()
export class MessageButtonsService {
  constructor(
    @InjectRepository(MessageButtons)
    private readonly messageButtonsRepository: Repository<MessageButtons>,
    @InjectRepository(MessageButtonsList)
    private readonly messageButtonsListRepository: Repository<MessageButtonsList>,
  ) {}

  async getButtonById(id: number): Promise<MessageButtons | null> {
    return this.messageButtonsRepository.findOneBy({ id });
  }

  async getButtonsForMessage(messageId: number): Promise<MessageButtons[]> {
    const relations = await this.messageButtonsListRepository.find({
      where: { message: { id: messageId } }, // Исправлено на связь через message
      relations: ['button'],
    });
    return relations.map((rel) => rel.button);
  }
}