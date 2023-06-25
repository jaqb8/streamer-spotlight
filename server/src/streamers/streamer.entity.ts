import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';
import { StreamingPlatform } from './streaming-platform.enum';
import { ObjectId } from 'mongodb';

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
}
