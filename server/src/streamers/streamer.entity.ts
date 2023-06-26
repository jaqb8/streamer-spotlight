import { Column, Entity, Index, ManyToOne, ObjectIdColumn } from 'typeorm';
import { StreamingPlatform } from './streaming-platform.enum';
import { ObjectId } from 'mongodb';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Streamer {
  @ObjectIdColumn()
  _id: ObjectId;

  @Index({ unique: true })
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  platform: StreamingPlatform;

  @Column()
  likes: string[];

  @Column()
  dislikes: string[];

  @ManyToOne((_type) => User, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
