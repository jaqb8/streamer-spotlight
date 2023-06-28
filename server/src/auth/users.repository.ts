import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { sign } from 'crypto';
import { SignUpDto } from './dto/signup.dto';

const USER_EXISTS_ERROR_CODE = 11000;

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(signUpDto: SignUpDto): Promise<void> {
    const { username, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      id: uuid(),
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === USER_EXISTS_ERROR_CODE) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
