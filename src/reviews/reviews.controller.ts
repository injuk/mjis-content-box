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
  UseGuards,
  ForbiddenException,
  Req,
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
import { UserGuard } from '../users/user.guard';
import { UserRoles } from '../common/enums/user-roles.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly reviewsService: ReviewsService,
  ) {}

  @UseGuards(UserGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createReview(@Req() req, @Body(CreateReviewDtoPipe) dto: CreateReviewDto) {
    if (req.user.role === UserRoles.GUEST)
      throw new ForbiddenException(`${UserRoles.GUEST} cannot write review`);

    return this.reviewsService.createReview(req.user, dto);
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

  @UseGuards(UserGuard)
  @Patch('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateReview(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateReviewDtoPipe) dto: UpdateReviewDto,
  ) {
    if (req.user.role === UserRoles.GUEST)
      throw new ForbiddenException(`${UserRoles.GUEST} cannot write review`);

    return this.reviewsService.updateReview(req.user, id, dto);
  }

  @UseGuards(UserGuard)
  @Delete('/:id')
  @HttpCode(204)
  deleteReviewById(@Req() req, @Param('id', ParseIntPipe) id: number) {
    if (req.user.role === UserRoles.GUEST)
      throw new ForbiddenException(`${UserRoles.GUEST} cannot write review`);

    return this.reviewsService.deleteReviewById(req.user, id);
  }
}
