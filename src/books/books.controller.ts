import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import commonConfig from 'src/config/common.config';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly booksService: BooksService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createBook(@Body() dto: CreateBookDto) {
    return this.booksService.createBook(dto);
  }

  @Get()
  // TODO: nextToken 방식 도입하기
  listBooks() {
    return this.booksService.listBooks();
  }

  @Get('/:id')
  getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookById(id);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
  ) {
    // TODO: 더 우아한 방법은 없을까...?
    if (!Object.keys(dto).length) throw new BadRequestException(`empty data`);

    return this.booksService.updateBook(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteBookById(id);
  }
}
