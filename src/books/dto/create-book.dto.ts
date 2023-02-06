import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @Transform((title) => title.value.trim())
  readonly title: string;

  @IsString()
  @Transform((title) => title.value.trim())
  readonly originalTitle: string;

  @Transform((author) => author.value.trim())
  @IsString()
  readonly author: string;

  @IsString()
  @IsOptional()
  // TODO: Number가 들어와도 trim할 수 있도록
  // @Transform((publisher) => publisher.value.trim())
  readonly publisher: string;

  @IsDateString()
  @IsOptional()
  readonly publishedAt: string;

  @Transform((code) => code.value.trim())
  @IsString()
  @Length(13, 13)
  readonly isbn: string;

  @IsString()
  @IsOptional()
  // @Transform((genre) => genre.value.trim())
  readonly genre: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  // @Transform((url) => url.value.trim())
  readonly coverUrl: string;
}
