export class Logger {
  static log(message: string, ...optionalParams: any[]) {
    if (__DEV__) {
      console.log(message, ...optionalParams);
    }
  }

  static warn(message: string, ...optionalParams: any[]) {
    if (__DEV__) {
      console.warn(message, ...optionalParams);
    }
  }

  static error(message: string, ...optionalParams: any[]) {
    if (__DEV__) {
      console.error(message, ...optionalParams);
    }
  }
}
