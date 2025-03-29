import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Message } from './message.entity';
  import { MessageButtons } from './message-buttons.entity';
  
  @Entity('message_buttons_list')
  export class MessageButtonsList {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Message, (message) => message.buttons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'messageId' })
    message: Message;
  
    @ManyToOne(() => MessageButtons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'buttonId' })
    button: MessageButtons;
  }