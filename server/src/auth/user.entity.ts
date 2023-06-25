import { ObjectId } from 'mongodb';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Index({ unique: true })
  @Column()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
