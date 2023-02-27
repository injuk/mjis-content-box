import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ReviewDomainEnum } from '../enums/review-domain.enum';

export class CreateReviewDtoPipe implements PipeTransform {
  transform(dto: any, metadata: ArgumentMetadata): any {
    const errorMessages = [];

    const { domain, rating, content } = dto;
    if (!this.isValidDomain(domain))
      errorMessages.push(`invalid domain(${domain})`);
    dto.domain = domain.toUpperCase();

    if (!this.isValidRating(rating))
      errorMessages.push(`rating must be 0 <= rating < 5 or a multiple of 0.5`);

    dto.content = typeof content === 'string' ? content.trim() : '';

    if (errorMessages.length) throw new BadRequestException(errorMessages);
    return dto;
  }

  private isValidDomain(rawDomain = '') {
    const domain = rawDomain?.toUpperCase ? rawDomain.toUpperCase() : rawDomain;

    if (!domain) return false;

    return domain in ReviewDomainEnum;
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
}
