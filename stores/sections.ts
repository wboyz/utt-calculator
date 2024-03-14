import { Duration } from "luxon";
import { Section } from "~/models/section";
import { SimpleDuration } from "~/models/simple-duration";

export const useSectionsStore = defineStore("sections", () => {
  const sections = ref([
    new Section(1, 3.2, "Rajt", "Tiszaörvény", undefined, 1),
    new Section(2, 11.2, "Tiszaörvéy", "Tiszaderzs", 0, 2),
    new Section(3, 8.2, "Tiszaderzs", "Abádszalók", 1, 3),
    new Section(4, 2.7, "Abádszalók", "Abádszalók kikötő", 2, 4),
    new Section(5, 6.6, "Abádszalók kikötő", "Kisköre", 3, 5),
    new Section(6, 5.7, "Kisköre", "Dinnyéshát", 4, 6),
    new Section(7, 9.3, "Dinnyéshát", "Sarud", 5, 7),
    new Section(8, 8.2, "Sarud", "Poroszló", 6, 8),
    new Section(9, 9.9, "Poroszló", "Fordító", 7, 9),
    new Section(10, 9.9, "Fordító", "Poroszló", 8, 10),
    new Section(11, 8.2, "Poroszló", "Sarud", 9, 11),
    new Section(12, 9.3, "Sarud", "Dinnyéshát", 10, 12),
    new Section(13, 5.7, "Dinnyéshát", "Kisköre", 11, 13),
    new Section(14, 6.6, "Kisköre", "Abádszalók kikötő", 12, 14),
    new Section(15, 2.7, "Abádszalók kikötő", "Abádszalók", 13, 15),
    new Section(16, 8.2, "Abádszalók", "Tiszaderzs", 14, 16),
    new Section(17, 11.2, "Tiszaderzs", "Tiszaörvény", 15, 17),
    new Section(18, 3.2, "Tiszaörvéy", "Cél", 16, undefined),
  ]);

  const startTime = ref(new SimpleDuration(5, 0, 0));

  function completenessPercent() {
    const filledSectionCount = sections.value.filter(
      (section) => section.runnerIndex !== null
    ).length;
    return Math.floor((filledSectionCount / sections.value.length) * 100);
  }

  function totalDistance() {
    return sections.value.reduce((acc, section) => acc + section.distance, 0);
  }

  function totalDuration() {
    const time1 = Duration.fromObject(
      sections.value[sections.value.length - 1].arrival
    );
    const time2 = startTime.value;
    return Duration.fromObject(time1)
      .minus(Duration.fromObject(time2))
      .toFormat("hh:mm:ss");
  }

  return {
    sections,
    startTime,
    completenessPercent,
    totalDistance,
    totalDuration,
  };
});
