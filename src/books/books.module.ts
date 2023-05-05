import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  imports: [UsersModule],
})
export class BooksModule {}
