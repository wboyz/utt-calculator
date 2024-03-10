import { Duration } from "luxon";
import type { SimpleDuration } from "./simple-duration";

export class Runner {
  constructor(public name: string, public pace: SimpleDuration) { }

  formattedTime(distance: number) {
    const totalTimeInSeconds = this.pace.minutes * 60 + this.pace.seconds;
    const totalTimeInMinutes = totalTimeInSeconds / 60 * distance;
    const hours = Math.floor(totalTimeInMinutes / 60);
    const minutes = Math.floor(totalTimeInMinutes % 60);
    const seconds = Math.floor(totalTimeInMinutes * 60 % 60);

    return Duration.fromObject({ hours, minutes, seconds }).toFormat('hh:mm:ss');
  }
}
