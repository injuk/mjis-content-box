export default class Utility {
  static trimWhenStringValue({ value }) {
    return typeof value === 'string' ? value?.trim() : value;
  }

  /** validation rule: /^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,}/ */
  static passwordValidationRule() {
    const startOfRegex = '^';
    const noSpace = '(?!.* )';
    const leastOneLowerCase = '(?=.*[a-z])';
    const leastOneUpperCase = '(?=.*[A-Z])';
    const leastOneDigit = '(?=.*\\d)';
    const leastOneSpecialCharacter = '(?=.*[$@!%*?&])';
    const allowedCharacters = '[A-Za-z\\d$@!%*?&]';
    const allowedPasswordLength = '{8,}';

    return new RegExp(
      startOfRegex +
        noSpace +
        leastOneLowerCase +
        leastOneUpperCase +
        leastOneDigit +
        leastOneSpecialCharacter +
        allowedCharacters +
        allowedPasswordLength,
    );
  }
}
