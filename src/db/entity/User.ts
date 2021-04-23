import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class User {
  @Column()
  id!: number | string;

  @Column({ length: 100 })
  password!: string;

  @Column({ length: 100 })
  idType: string;

  @Column({ length: 100 })
  token: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export = User;
