import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import commonConfig from 'src/config/common.config';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly service: BooksService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createBook(@Body() dto: CreateBookDto) {
    return this.service.createBook(dto);
  }
}
