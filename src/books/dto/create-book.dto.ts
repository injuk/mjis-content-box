import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
import Utility from '../../common/util';

export class CreateBookDto {
  @IsString()
  @Transform(Utility.trimWhenStringValue)
  readonly title: string;

  @IsString()
  @Transform(Utility.trimWhenStringValue)
  readonly originalTitle: string;

  @IsString()
  @Transform(Utility.trimWhenStringValue)
  readonly author: string;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly publisher: string;

  @IsDateString()
  @IsOptional()
  readonly publishedAt: string;

  @IsString()
  @Length(13, 13)
  @Transform(Utility.trimWhenStringValue)
  readonly isbn: string;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly genre: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly coverUrl: string;
}
