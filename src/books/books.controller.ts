import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import commonConfig from 'src/config/common.config';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
  ) {}

  @Get()
  temp() {
    return this.config;
  }
}
