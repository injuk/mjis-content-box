import { Logger, Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(private readonly prisma: PrismaService) {}

  createBook(dto: CreateBookDto) {
    const { author, isbn } = dto;

    return this.prisma.$transaction(async (transactionCtx) => {
      const book = await transactionCtx.book.findUnique({
        where: {
          UQ_AUTHOR_ISBN: { author, isbn },
        },
      });

      if (book) throw new ConflictException(`author(${author}), isbn(${isbn})`);

      return transactionCtx.book.create({
        data: {
          title: dto.title,
          originalTitle: dto.originalTitle,
          author: dto.author,
          publisher: dto.publisher,
          publishedAt: dto.publishedAt,
          isbn: dto.isbn,
          genre: dto.genre,
          coverUrl: dto.coverUrl,

          // TODO: users API가 도입되면 수정할 것
          createdBy: 1,
          updatedBy: 1,
        },
      });
    });
  }
}
