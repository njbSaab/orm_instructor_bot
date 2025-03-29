import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Message } from './message.entity';
  
  @Entity('keys_menu')
  export class KeysMenu {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ type: 'int', default: 0 })
    order: number;
  
    @Column({ type: 'int', nullable: true })
    parentId: number;
  
    @Column({ type: 'int', nullable: true })
    levelMenu: number;
  
    @ManyToOne(() => KeysMenu, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'parentMenuId' })
    parent_menu: KeysMenu;
  
    @Column({ type: 'boolean', default: true })
    isActive: boolean;
  
    @Column({ type: 'boolean', default: true })
    isEditable: boolean;
  
    @Column({ type: 'int', nullable: true })
linkedPostId: number;

    @ManyToOne(() => Message, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'linkedPostId' })
    linked_post: Message;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }