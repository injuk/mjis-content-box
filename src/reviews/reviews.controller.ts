import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  Inject,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import commonConfig from '../config/common.config';
import { ConfigType } from '@nestjs/config';
import { ReviewDomainEnum } from './enums/review-domain.enum';
import { ListReviewsDto } from './dto/list-reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createReview(@Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(dto);
  }

  @Get()
  listReviews(@Query('domain') dto: ListReviewsDto) {
    return this.reviewsService.listReviews(dto);
  }

  @Get('/:id')
  getReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.getReviewById(id);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.deleteReviewById(id);
  }
}
