import { Duration } from "luxon";
import { SimpleDuration } from "./simple-duration";

export class Section {
  constructor(
    public id: number,
    public distance: number,
    public from: string,
    public to: string,
    public arrival: SimpleDuration
  ) { }

  public calculateArrival(startingTime: SimpleDuration, runningTime: string = '00:00'): string {
    const [runningHours, runningMinutes] = runningTime.split(':').map(Number);

    const totalMinutes = startingTime.hours * 60 + startingTime.minutes + (runningHours * 60 + runningMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = totalMinutes * 60 % 60;

    this.arrival = new SimpleDuration(hours, minutes, seconds);
    return Duration.fromObject(this.arrival).toFormat('hh:mm:ss');
  }
}