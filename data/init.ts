import type { SimpleDuration } from "~/models/simple-duration";
import { Runners } from "./runners";
import { Sections } from "./sections";

export default function initData(startingTime: SimpleDuration, sections: any) {
  Runners.init();
  Sections.init(startingTime, sections);
}