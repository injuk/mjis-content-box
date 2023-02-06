import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

const trimWhenStringValue = ({ value }) =>
  typeof value === 'string' ? value?.trim() : value;

export class CreateBookDto {
  @IsString()
  @Transform(trimWhenStringValue)
  readonly title: string;

  @IsString()
  @Transform(trimWhenStringValue)
  readonly originalTitle: string;

  @IsString()
  @Transform(trimWhenStringValue)
  readonly author: string;

  @IsString()
  @IsOptional()
  @Transform(trimWhenStringValue)
  readonly publisher: string;

  @IsDateString()
  @IsOptional()
  readonly publishedAt: string;

  @IsString()
  @Length(13, 13)
  @Transform(trimWhenStringValue)
  readonly isbn: string;

  @IsString()
  @IsOptional()
  @Transform(trimWhenStringValue)
  readonly genre: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @Transform(trimWhenStringValue)
  readonly coverUrl: string;
}
