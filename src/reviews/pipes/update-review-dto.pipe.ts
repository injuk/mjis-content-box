import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class UpdateReviewDtoPipe implements PipeTransform {
  transform(dto: any, metadata: ArgumentMetadata): any {
    const errorMessages = [];

    if (!Object.keys(dto).length)
      errorMessages.push(`update review payload is empty`);

    const { rating, content, hasSpoiler } = dto;
    if (!this.isValidRating(rating))
      errorMessages.push(`rating must be 0 <= rating < 5 or a multiple of 0.5`);

    if (!this.isValidHasSpoiler(hasSpoiler))
      errorMessages.push(`invalid hasSpoiler(${hasSpoiler})`);

    dto.content = typeof content === 'string' ? content.trim() : '';

    if (errorMessages.length) throw new BadRequestException(errorMessages);
    return dto;
  }

  private isValidRating(rating = 0) {
    if (rating === 0) return true;
    if (typeof rating !== 'number') return false;

    const min = 0;
    const max = 50;
    const criteria = 10;

    const target = rating * 10;
    if (target < min || target > max) return false;

    return target === 0 || Math.abs((target * 10) % criteria) === 0;
  }

  private isValidHasSpoiler(hasSpoiler) {
    if (hasSpoiler === null) return false;

    return hasSpoiler ? typeof hasSpoiler === 'boolean' : true;
  }
}
