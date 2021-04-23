import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn()
  id!: number | string;

  @Column({ length: 100 })
  password!: string;

  @Column({ length: 100 })
  idType: string;

  @Column({ length: 100 })
  refreshToken: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export = User;
