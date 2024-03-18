import { Duration } from "luxon";
import { Section } from "~/models/section";
import { SimpleDuration } from "~/models/simple-duration";

export const useSectionsStore = defineStore("sections", () => {
  const startTime = ref(new SimpleDuration(5, 0, 0));
  const sections = ref([
    new Section(1, 3.2, "Rajt", "Tiszaörvény", startTime.value),
    new Section(2, 11.2, "Tiszaörvéy", "Tiszaderzs"),
    new Section(3, 8.2, "Tiszaderzs", "Abádszalók"),
    new Section(4, 2.7, "Abádszalók", "Abádszalók kikötő"),
    new Section(5, 6.6, "Abádszalók kikötő", "Kisköre"),
    new Section(6, 5.7, "Kisköre", "Dinnyéshát"),
    new Section(7, 9.3, "Dinnyéshát", "Sarud"),
    new Section(8, 8.2, "Sarud", "Poroszló"),
    new Section(9, 9.9, "Poroszló", "Fordító"),
    new Section(10, 9.9, "Fordító", "Poroszló"),
    new Section(11, 8.2, "Poroszló", "Sarud"),
    new Section(12, 9.3, "Sarud", "Dinnyéshát"),
    new Section(13, 5.7, "Dinnyéshát", "Kisköre"),
    new Section(14, 6.6, "Kisköre", "Abádszalók kikötő"),
    new Section(15, 2.7, "Abádszalók kikötő", "Abádszalók"),
    new Section(16, 8.2, "Abádszalók", "Tiszaderzs"),
    new Section(17, 11.2, "Tiszaderzs", "Tiszaörvény"),
    new Section(18, 3.2, "Tiszaörvéy", "Cél"),
  ]);

  sections.value.forEach((section, index) => {
    if (index > 0) {
      section.previousSection = sections.value[index - 1];
    }
  });


  function completenessPercent() {
    const filledSectionCount = sections.value.filter(
      (section) => section.runner !== null
    ).length;
    return Math.floor((filledSectionCount / sections.value.length) * 100);
  }

  function totalDistance() {
    return sections.value.reduce((acc, section) => acc + section.distance, 0);
  }

  function totalDuration() {
    console.log(sections.value);
    console.log(sections.value[sections.value.length - 1]);

    const time1 = Duration.fromObject(sections.value[sections.value.length - 1].arrival());
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
