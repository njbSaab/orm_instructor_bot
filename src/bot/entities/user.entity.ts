import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'bigint' })
  id: number; // ID пользователя Telegram

  @Column({ type: 'boolean', default: false })
  is_bot: boolean;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  language_code: string;

  @Column({ type: 'boolean', default: false })
  can_join_groups: boolean;

  @Column({ type: 'boolean', default: false })
  can_read_all_group_messages: boolean;

  @Column({ type: 'boolean', default: false })
  supports_inline_queries: boolean;

  @Column({ type: 'varchar', length: 50, default: 'default' })
  state: string;

  @Column({ type: 'timestamp', nullable: true })
  last_active: Date;

  @Column({ type: 'boolean', default: false })
  isNewsActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}