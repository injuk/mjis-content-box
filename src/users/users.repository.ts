import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { selectUserClause } from './domain/select-conditions.user';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUser(data: CreateUserDto) {
    const { email } = data;
    return this.prisma.$transaction(async (transActionCtx) => {
      const user = await transActionCtx.user.findUnique({
        where: {
          email,
        },
      });

      if (user) throw new ConflictException(`email(${email})`);

      const result = await transActionCtx.user.create({
        data,
      });
      Reflect.deleteProperty(result, 'password');

      return result;
    });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: selectUserClause,
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  updateMe(id: number, dto: UpdateUserDto) {
    return this.prisma.$transaction(async (transActionCtx) => {
      const user = await transActionCtx.user.findUnique({
        where: { id },
      });
      if (!user) throw new NotFoundException(`user_id(${id})`);

      const result = await transActionCtx.user.update({
        where: { id },
        data: { ...dto },
      });
      Reflect.deleteProperty(result, 'password');

      return result;
    });
  }

  deleteMe(id: number) {
    return this.prisma.$transaction(async (transActionCtx) => {
      const user = await transActionCtx.user.findUnique({
        where: { id },
      });
      if (!user) throw new NotFoundException(`user_id(${id})`);

      return transActionCtx.user.delete({
        where: { id },
      });
    });
  }
}
