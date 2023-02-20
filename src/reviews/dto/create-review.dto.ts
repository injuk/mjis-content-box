import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';
import Utility from '../../common/util';
import { Transform } from 'class-transformer';
import { ValidRating } from '../validators/rating.validator';
import { ReviewDomainEnum } from '../enums/review-domain.enum';
import { ValidDomain } from '../validators/domain.validator';

export class CreateReviewDto {
  @IsInt()
  @IsPositive()
  readonly userId: number;

  @IsInt()
  @IsPositive()
  readonly itemId: number;

  @IsString()
  @Validate(ValidDomain, {
    message: `invalid domain`,
  })
  @Transform(Utility.toUpperCase)
  readonly domain: ReviewDomainEnum;

  @IsNotEmpty()
  @Validate(ValidRating, {
    message: 'rating must be 0 <= rating < 5 or a multiple of 0.5',
  })
  readonly rating: number;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly content: string;

  @IsBoolean()
  readonly hasSpoiler: boolean;
}
