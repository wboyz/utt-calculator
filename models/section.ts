import { Duration } from "luxon";
import { SimpleDuration } from "./simple-duration";
import { Runner } from "./runner";

export class Section {
  constructor(
    public id: number,
    public distance: number,
    public from: string,
    public to: string,
    public defaultStartTime: SimpleDuration = { hours: 5, minutes: 0, seconds: 0 },
    public previousSection?: Section,
    public runner: Runner | null = null,
  ) { }


  private startTime(): SimpleDuration {
    if (this.previousSection === undefined) {
      return this.defaultStartTime;
    }

    return this.previousSection.arrival();
  }

  public arrivalAsString(): string {
    return Duration.fromObject(this.arrival()).toFormat("hh:mm:ss");
  }

  public arrival(): SimpleDuration {
    if (this.runner === null) {
      return this.defaultStartTime;
    }
    const [runningHours, runningMinutes] = this.runner
      .formattedTime(this.distance)
      .split(":")
      .map(Number);
    const startTime = this.startTime();

    const totalMinutes =
      startTime.hours * 60 +
      startTime.minutes +
      (runningHours * 60 + runningMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = (totalMinutes * 60) % 60;

    return new SimpleDuration(hours, minutes, seconds);
  }
}
