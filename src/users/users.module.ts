import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserGuard } from './user.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserGuard],
  exports: [UsersService, UserGuard],
})
export class UsersModule {}
