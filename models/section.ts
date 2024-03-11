import { Duration } from "luxon";
import { SimpleDuration } from "./simple-duration";
import { Sections } from "../data/sections";
import { Runner } from "./runner";
import { Runners } from "../data/runners";

export class Section {
  constructor(
    public id: number,
    public distance: number,
    public from: string,
    public to: string,
    public previousSectionIndex?: number,
    public nextSectionIndex?: number,
    public runnerIndex: number = 0,
  ) { }

  public get runner(): Runner | null {
    return Runners.getByIndex(this.runnerIndex);
  }

  private get startTime(): SimpleDuration {
    if (this.previousSectionIndex === undefined) {
      return Sections.getStartTime();
    }
    
    return Sections.getByIndex(this.previousSectionIndex)!.arrival;
  }

  public get arrivalAsString(): string {
    return Duration.fromObject(this.arrival).toFormat('hh:mm:ss');
  }

  public get arrival(): SimpleDuration {
    if (this.runner === null) {
      return Sections.getStartTime();
    }
    const [runningHours, runningMinutes] = this.runner.formattedTime(this.distance).split(':').map(Number);

    const totalMinutes = this.startTime.hours * 60 + this.startTime.minutes + (runningHours * 60 + runningMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = totalMinutes * 60 % 60;

    return new SimpleDuration(hours, minutes, seconds);
  }
}