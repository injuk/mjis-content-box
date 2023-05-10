import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import commonConfig from 'src/config/common.config';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UserGuard } from '../users/guard/user.guard';
import { UserRoles } from '../common/enums/user-roles.enum';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly booksService: BooksService,
  ) {}

  @UseGuards(UserGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createBook(@Req() req, @Body() dto: CreateBookDto) {
    if (req.user.role !== UserRoles.ADMIN)
      throw new ForbiddenException(`role must be ${UserRoles.ADMIN}`);

    return this.booksService.createBook(req.user, dto);
  }

  @Get()
  // TODO: nextToken 방식 도입하기
  listBooks() {
    return this.booksService.listBooks();
  }

  @Get('/:id')
  getBookById(
    @Param('id', ParseIntPipe) id: number,
    @Query('hasReviews') hasReviews: string,
  ) {
    return this.booksService.getBookById(id, this.toBoolean(hasReviews));
  }

  private toBoolean(str: string): boolean {
    if (!str) return false;

    return str.toUpperCase() === 'TRUE';
  }

  @UseGuards(UserGuard)
  @Patch('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateBook(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
  ) {
    if (req.user.role !== UserRoles.ADMIN)
      throw new ForbiddenException(`role must be ${UserRoles.ADMIN}`);

    // TODO: 더 우아한 방법은 없을까...?
    if (!Object.keys(dto).length) throw new BadRequestException(`empty data`);

    return this.booksService.updateBook(req.user, id, dto);
  }

  @UseGuards(UserGuard)
  @Delete('/:id')
  @HttpCode(204)
  async deleteBookById(@Req() req, @Param('id', ParseIntPipe) id: number) {
    if (req.user.role !== UserRoles.ADMIN)
      throw new ForbiddenException(`role must be ${UserRoles.ADMIN}`);

    return this.booksService.deleteBookById(req.user, id);
  }
}
