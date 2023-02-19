import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class ValidRating implements ValidatorConstraintInterface {
  private readonly min = 0;
  private readonly max = 5;
  private readonly condition = 0.5;

  validate(rating: number, validationArguments: ValidationArguments) {
    if (rating < this.min || rating > this.max) return false;
    return rating === 0 || Math.abs(rating % this.condition) === 0;
  }
}
