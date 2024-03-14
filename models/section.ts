import { Duration } from "luxon";
import { SimpleDuration } from "./simple-duration";
import { Runner } from "./runner";
import { useRunnersStore } from "~/stores/runners";
import { useSectionsStore } from "~/stores/sections";

export class Section {
  constructor(
    public id: number,
    public distance: number,
    public from: string,
    public to: string,
    public previousSectionIndex?: number,
    public nextSectionIndex?: number,
    public runnerIndex: number = 0
  ) {}

  public get runner(): Runner | null {
    return useRunnersStore().runners[this.runnerIndex] || null;
  }

  private get startTime(): SimpleDuration {
    if (this.previousSectionIndex === undefined) {
      return useSectionsStore().startTime;
    }

    return useSectionsStore().sections[this.previousSectionIndex].arrival;
  }

  public get arrivalAsString(): string {
    return Duration.fromObject(this.arrival).toFormat("hh:mm:ss");
  }

  public get arrival(): SimpleDuration {
    if (this.runner === null) {
      return useSectionsStore().startTime;
    }
    const [runningHours, runningMinutes] = this.runner
      .formattedTime(this.distance)
      .split(":")
      .map(Number);

    const totalMinutes =
      this.startTime.hours * 60 +
      this.startTime.minutes +
      (runningHours * 60 + runningMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = (totalMinutes * 60) % 60;

    return new SimpleDuration(hours, minutes, seconds);
  }
}
