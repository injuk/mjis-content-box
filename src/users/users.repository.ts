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

      return transActionCtx.user.create({
        data,
      });
    });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: selectUserClause,
    });
  }

  getUserForSignIn(email: string, password: string) {
    return this.prisma.user.findFirst({
      where: { email, password },
    });
  }

  updateMe(id: number, dto: UpdateUserDto) {
    return this.prisma.$transaction(async (transActionCtx) => {
      const user = await transActionCtx.user.findUnique({
        where: { id },
      });
      if (!user) throw new NotFoundException(`user_id(${id})`);

      return transActionCtx.user.update({
        where: { id },
        data: { ...dto },
      });
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
