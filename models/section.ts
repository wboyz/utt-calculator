export class Section {
  constructor(
    public id: number,
    public distance: number,
    public from: string,
    public to: string,
    public arrival: string
  ) { }

  public calculateArrival(startingTime: string, runningTime: string = '00:00'): string {
    const [startingHours, startingMinutes] = startingTime.split(':').map(Number);
    const [runningHours, runningMinutes] = runningTime.split(':').map(Number);

    const totalMinutes = startingHours * 60 + startingMinutes + (runningHours * 60 + runningMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    this.arrival = `${hours.toString().padStart(2, '0')}:${minutes.toFixed(2).padStart(2, '0')}`;
    return this.arrival;
  }
}