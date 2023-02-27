export default class Utility {
  static trimWhenStringValue({ value }) {
    return typeof value === 'string' ? value?.trim() : value;
  }

  // TODO: pipe로 옮기기
  static toUpperCase({ value }) {
    return value.toUpperCase();
  }
}
