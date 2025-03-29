import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Message } from './message.entity';
  import { MessageButtons } from './message-buttons.entity';
  
  @Entity('button_send_message')
  export class ButtonSendMessage {
    @PrimaryGeneratedColumn()
    id: number;
  
    // Ссылка на inline‑кнопку, которая должна вызвать сообщение
    @ManyToOne(() => MessageButtons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'buttonId' })
    button: MessageButtons;
  
    // Сообщение, которое будет отправлено при нажатии кнопки
    @ManyToOne(() => Message, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'messageId' })
    message: Message;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }