import { IsEnum } from 'class-validator';

export enum VoteType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export class VoteStreamerDto {
  @IsEnum(VoteType)
  type: VoteType;
}
