import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { selectUserClause } from './domain/select-conditions.user';

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
}
