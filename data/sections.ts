import { SimpleDuration } from "~/models/simple-duration";
import { Section } from "~/models/section";

export class Sections {
  private static items: Section[] = [];
  private static startTime: SimpleDuration = new SimpleDuration(0, 0, 0);

  public static getStartTime(): SimpleDuration {
    return Sections.startTime;
  }

  public static init(time: SimpleDuration, sections: any): void {
    Sections.startTime = time;
    Sections.items = sections;
  }

  public static all(): Section[] {
    return Sections.items;
  }

  public static getByIndex(index: number): Section | null {
    const section = Sections.items[index];
    return section || null;
  }

  public static getSumOfDistances(): number {
    return Sections.items.reduce((acc, section) => acc + section.distance, 0);
  }

  public static getAssignedSections(): Section[] {
    return Sections.items.filter(section => section.runnerIndex !== null);
  }
}
