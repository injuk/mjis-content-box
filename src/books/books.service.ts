import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(private readonly prisma: PrismaService) {}

  createBook(dto: CreateBookDto) {
    // TODO: 트랜잭션 안에서 author, isbn 검색 후 생성 시도할 것
    this.logger.debug('create book, ', JSON.stringify(dto));

    const data: Prisma.BookCreateInput = {
      title: dto.title,
      originalTitle: dto.originalTitle,
      author: dto.author,
      publisher: dto.publisher,
      publishedAt: dto.publishedAt,
      isbn: dto.isbn,
      genre: dto.genre,
      coverUrl: dto.coverUrl,
      createdBy: 1,
      updatedBy: 1,
    };

    return this.prisma.book.create({
      data,
    });
  }
}
