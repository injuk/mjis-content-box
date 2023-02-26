import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ValidRating } from '../validators/rating.validator';
import { Transform } from 'class-transformer';
import Utility from '../../common/util';

export class UpdateReviewDto {
  @IsOptional()
  @Validate(ValidRating, {
    message: 'rating must be 0 <= rating < 5 or a multiple of 0.5',
  })
  readonly rating: number;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly content: string;

  @IsOptional()
  readonly hasSpoiler: boolean;
}
