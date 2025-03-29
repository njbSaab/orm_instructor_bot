import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ButtonSendMessage } from '../entities/buttons-send-message.entity'; // Исправьте путь, если отличается

@Injectable()
export class ButtonSendMessageService {
  constructor(
    @InjectRepository(ButtonSendMessage)
    private readonly bsmRepository: Repository<ButtonSendMessage>,
  ) {}

  async getMessageByButtonId(buttonId: number): Promise<ButtonSendMessage | null> {
    return this.bsmRepository.findOne({
      where: { button: { id: buttonId } }, // Предполагается, что buttonId ссылается на MessageButtons
      relations: ['message'],
    });
    // Альтернатива с findOneBy:
    // return this.bsmRepository.findOneBy({ button: { id: buttonId } });
  }
}