import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly repository: UsersRepository) {}

  createUser(dto: CreateUserDto) {
    return this.repository.createUser(dto);
  }

  async getUserById(id: number) {
    const result = await this.repository.getUserById(id);
    if (!result) throw new NotFoundException(`user_id(${id})`);

    return result;
  }

  async getUserByEmail(email: string) {
    const result = await this.repository.getUserByEmail(email);
    if (!result) throw new NotFoundException(`user_email(${email})`);

    return result;
  }

  updateMe(dto: UpdateUserDto) {
    // TODO: 로그인 기능 구현 후 수정 필요
    const id = 2;
    if (!id) throw new BadRequestException(`id should not be empty`);

    return this.repository.updateMe(id, dto);
  }

  deleteMe() {
    // TODO: 로그인 기능 구현 후 수정 필요
    const id = 2;
    if (!id) throw new BadRequestException(`id should not be empty`);

    return this.repository.deleteMe(id);
  }
}
