export class Timeout {
  readonly timeId;
  constructor(callback: () => void, time: number) {
    this.timeId = setInterval(callback, time);
  }
  clear() {
    clearTimeout(this.timeId);
  }
}
