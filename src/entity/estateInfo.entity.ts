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
import { UserEntity } from './user.entity';

@Entity()
export class EstateEntity {
  @Column()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Exclude()
  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  bed: number;

  @Column({ nullable: false })
  toilet: number;

  @Column({ nullable: false })
  pool: boolean;

  @Column('text', { nullable: true, array: true })
  imgUrl: string[];

  @Column({ nullable: true })
  m2: number;

  @Column({ nullable: false })
  widthStreet: string;

  @Column({ nullable: false })
  otoStreet: boolean;

  @Column({ nullable: false })
  gerion: string;

  @Column({ nullable: false })
  status: number;

  @Column({ nullable: true })
  notification: string;

  @Column({ nullable: true })
  type: string;

  @Column()
  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  @CreateDateColumn()
  createdDate: Date;

  @ManyToMany(() => UserEntity, (userEntity) => userEntity.estateEntities)
  userEntities: UserEntity[];
}
