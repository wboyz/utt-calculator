export class Runner {
  constructor(public name: string, public pace: number) {}

  formattedTime(distance: number) {
    const totalTime = this.pace * distance;
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    return `${hours}:${minutes.toFixed(2).toString().padStart(2, '0')}`;
  }
}
