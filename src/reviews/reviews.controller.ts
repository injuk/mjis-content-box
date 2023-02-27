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
import { ListReviewsDto } from './dto/list-reviews.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDtoPipe } from './pipes/update-review-dto.pipe';
import { CreateReviewDtoPipe } from './pipes/create-review-dto.pipe';
import { ListReviewsDtoPipe } from './pipes/list-review-dto.pipe';
import { GetReviewDtoPipe } from './pipes/get-review-dto.pipe';

@Controller('reviews')
export class ReviewsController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createReview(@Body(CreateReviewDtoPipe) dto: CreateReviewDto) {
    return this.reviewsService.createReview(dto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  listReviews(@Query(ListReviewsDtoPipe) dto: ListReviewsDto) {
    return this.reviewsService.listReviews(dto);
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getReviewById(
    @Param('id', ParseIntPipe) id: number,
    @Query(GetReviewDtoPipe) dto: GetReviewDto,
  ) {
    return this.reviewsService.getReviewById(id, dto);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateReviewDtoPipe) dto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.deleteReviewById(id);
  }
}
