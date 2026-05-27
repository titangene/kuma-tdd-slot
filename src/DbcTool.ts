export class DbcTool {
  static require(checkCondition: () => boolean, message: string) {
    if (!checkCondition()) {
      throw new Error(message);
    }
  }
}
