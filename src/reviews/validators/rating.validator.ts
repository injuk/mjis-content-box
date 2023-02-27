import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class ValidRating implements ValidatorConstraintInterface {
  private readonly min = 0;
  private readonly max = 5;
  private readonly condition = 1;

  // TODO: pipe로 옮기기
  validate(rating: number, validationArguments: ValidationArguments) {
    if (typeof rating !== 'number') return false;
    if (rating < this.min || rating > this.max) return false;
    return rating === 0 || Math.abs((rating * 10) % this.condition) === 0;
  }
}
