import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GreetingBot } from '../../bot/entities/greeting-bot.entity';

@Injectable()
export class GreetingBotService {
  constructor(
    @InjectRepository(GreetingBot)
    private readonly greetingBotRepository: Repository<GreetingBot>,
  ) {}

  async getAllGreetings(): Promise<GreetingBot[]> {
    return this.greetingBotRepository.find();
  }

  async getGreetingById(id: number): Promise<GreetingBot | null> {
    return this.greetingBotRepository.findOneBy({ id });
  }

  async updateGreeting(id: number, updateData: Partial<GreetingBot>): Promise<GreetingBot | null> {
    const greeting = await this.greetingBotRepository.findOneBy({ id });

    if (!greeting) {
      return null;
    }

    Object.assign(greeting, updateData);
    return this.greetingBotRepository.save(greeting);
  }
}