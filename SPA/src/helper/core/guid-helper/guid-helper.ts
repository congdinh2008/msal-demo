export class GuidHelper {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  static Empty() {
    return '00000000-0000-0000-0000-000000000000';
  }

  static isvalidGuid(guid: string) {
    const pattern = new RegExp(
      '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
      'i'
    );
    if (pattern.test(guid) === true) {
      return true;
    }
    return false;
  }
}
