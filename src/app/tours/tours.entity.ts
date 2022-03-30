import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tours' })
export class ToursEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '255' })
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  photo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
