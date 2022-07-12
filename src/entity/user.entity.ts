import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { EstateEntity } from './estateInfo.entity';

@Entity()
export class UserEntity {
  @Column()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column()
  place: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column()
  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  @CreateDateColumn()
  createdDate: Date;

  @ManyToMany(() => EstateEntity, (estateEntity) => estateEntity.userEntities)
  @JoinTable()
  estateEntities: EstateEntity[];
}
