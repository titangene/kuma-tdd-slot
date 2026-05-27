export class DbcTool {
  static require(checkCondition: () => boolean, message: string): void {
    if (!checkCondition()) {
      throw new Error(message);
    }
  }

  static ensure(checkCondition: () => boolean, message: string): void {
    if (!checkCondition()) {
      throw new Error(message);
    }
  }
}
