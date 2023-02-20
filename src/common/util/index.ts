export default class Utility {
  static trimWhenStringValue({ value }) {
    return typeof value === 'string' ? value?.trim() : value;
  }

  static toUpperCase({ value }) {
    return value.toUpperCase();
  }
}
