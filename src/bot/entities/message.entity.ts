import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { KeysMenu } from './keys-menu.entity';
  import { MessageButtonsList } from './message-buttons-list.entity';
  
  @Entity('message')
  export class Message {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    message_title: string;
  
    @Column({ type: 'text', nullable: true })
    message_content: string;
  
    @Column({ type: 'text', nullable: true })
    message_image_url: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;
  
    @Column({ type: 'boolean', default: true })
    isEditable: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => KeysMenu, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'parentMenuId' })
    parent_menu: KeysMenu;
  
    @OneToMany(() => MessageButtonsList, (buttonList) => buttonList.message, { cascade: true })
    buttons: MessageButtonsList[];
  }