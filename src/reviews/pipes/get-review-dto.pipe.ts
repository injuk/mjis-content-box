import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ReviewDomainEnum } from '../enums/review-domain.enum';

export class GetReviewDtoPipe implements PipeTransform {
  transform(dto: any, metadata: ArgumentMetadata): any {
    const errorMessages = [];

    const { domain } = dto;
    if (!this.isValidDomain(domain))
      errorMessages.push(`invalid domain(${domain})`);

    dto.domain = domain.toUpperCase();

    if (errorMessages.length) throw new BadRequestException(errorMessages);

    return dto;
  }

  private isValidDomain(rawDomain = '') {
    const domain = rawDomain?.toUpperCase ? rawDomain.toUpperCase() : rawDomain;

    if (!domain) return false;

    return domain in ReviewDomainEnum;
  }
}
