import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('message_buttons')
  export class MessageButtons {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'enum', enum: ['full', 'inline'] })
    type: 'full' | 'inline';
  
    @Column({ type: 'text', nullable: true })
    url: string;
  
    @Column({ type: 'int', default: 0 })
    order: number;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;
  
    @Column({ type: 'boolean', default: true })
    isEditable: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
    
  }