import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GreetingBot } from '../entities/greeting-bot.entity';

@Injectable()
export class GreetingBotService {
  constructor(
    @InjectRepository(GreetingBot)
    private greetingRepository: Repository<GreetingBot>,
  ) {}

  async getAllGreetings(): Promise<GreetingBot[]> {
    return this.greetingRepository.find();
  }
}