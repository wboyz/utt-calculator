export class Runner {
  constructor(public name: string, public pace: number) { }

  formattedTime(distance: number) {
    const totalTime = this.pace * distance;
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    return `${hours}:${minutes.toFixed(2).padStart(2, '0')}`;
  }

  calculateElapsedTime(startingTime: string, distance: number): string {
    const runningTime = this.formattedTime(distance);
    const [startingHours, startingMinutes] = startingTime.split(':').map(Number);
    const [runningHours, runningMinutes] = runningTime.split(':').map(Number);

    const totalMinutes = startingHours * 60 + startingMinutes + (runningHours * 60 + runningMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toFixed(2).padStart(2, '0')}`;
  }
}
