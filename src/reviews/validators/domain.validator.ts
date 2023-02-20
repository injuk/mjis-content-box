import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ReviewDomainEnum } from '../enums/review-domain.enum';

@ValidatorConstraint()
export class ValidDomain implements ValidatorConstraintInterface {
  validate(
    domain: ReviewDomainEnum,
    validationArguments?: ValidationArguments,
  ) {
    return (
      domain === ReviewDomainEnum.BOOK || domain === ReviewDomainEnum.MOVIE
    );
  }
}
