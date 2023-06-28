import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
