import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';
import Utility from '../../common/util';
import { Transform } from 'class-transformer';
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
  @IsNumber()
  readonly rating: number;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly content: string;

  @IsBoolean()
  readonly hasSpoiler: boolean;
}
