import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class UpdateReviewDtoPipe implements PipeTransform {
  transform(dto: any, metadata: ArgumentMetadata): any {
    if (!Object.keys(dto).length)
      throw new BadRequestException([`update review payload is empty`]);

    return dto;
  }
}
