import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly repository: UsersRepository) {}

  signUp(dto: CreateUserDto) {
    return this.repository.createUser(dto);
  }

  signIn() {
    return 'log in!';
  }

  async getUserById(id: number) {
    const result = await this.repository.getUserById(id);
    if (!result) throw new NotFoundException(`user_id(${id})`);

    return result;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  deleteUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
