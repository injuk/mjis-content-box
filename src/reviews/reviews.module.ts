import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsRepository } from './reviews.repository';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
  imports: [UsersModule],
})
export class ReviewsModule {}
