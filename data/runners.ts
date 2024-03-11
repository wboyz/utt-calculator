import { Runner } from "~/models/runner";
import { SimpleDuration } from "~/models/simple-duration";

export class Runners {
  private static items: Runner[] = [];
  
  public static init(): void {
    Runners.items =  [
      new Runner('Runner 1', new SimpleDuration(0, 6, 30)),
      new Runner('Runner 2', new SimpleDuration(0, 7, 30)),
      new Runner('Runner 3', new SimpleDuration(0, 7, 15)),
      new Runner('Runner 4', new SimpleDuration(0, 5, 30)),
      new Runner('Runner 5', new SimpleDuration(0, 4, 30)),
      new Runner('Runner 6', new SimpleDuration(0, 6, 50)),
      new Runner('Runner 7', new SimpleDuration(0, 7, 0)),
      new Runner('Runner 8', new SimpleDuration(0, 7, 30)),
      new Runner('Runner 9', new SimpleDuration(0, 7, 10)),
      new Runner('Runner 10', new SimpleDuration(0, 6, 50))
    ];
  }
  
  public static all(): Runner[] {
      return Runners.items;
  }
  
  public static getByIndex(index: number): Runner | null {
      const runner = Runners.items[index];
      return runner || null;
  }

  public static randomIndex(): number {
    return Math.floor(Math.random() * Runners.items.length);
  }
}