export class Timeout {
  readonly timeId;
  constructor(callback: () => void, time: number) {
    this.timeId = setTimeout(callback, time);
  }
  clear() {
    clearTimeout(this.timeId);
  }
}
