import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import commonConfig from 'src/config/common.config';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly service: BooksService,
  ) {}

  @Get()
  temp() {
    return this.config;
  }

  @Post()
  createBook() {
    return this.service.createBook();
  }
}
