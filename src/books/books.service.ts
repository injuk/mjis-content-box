import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(private readonly prisma: PrismaService) {}

  createBook() {
    this.logger.debug('create book');

    return this.prisma.book.create({
      data: {
        title: 'ingnoh의 모험',
        originalTitle: 'the adventure of ingnoh',
        author: 'injuk',
        isbn: '1234567890124',
        genre: '로맨스',
        coverUrl: 'https://naver.com',
        createdBy: 1,
        updatedBy: 1,
      },
    });
  }
}
