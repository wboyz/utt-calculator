<script setup lang="ts">
useHead({ bodyAttrs : { class: 'bg-gray-100'} })

import { SimpleDuration } from './models/simple-duration';
import { Runner } from './models/runner';
import { Section } from './models/section';
import { Duration } from "luxon";

const selectedRunners = ref<Runner[]>([]);
const startingTime = ref(new SimpleDuration(5, 0, 0));

const sections: Section[] = [
  new Section(1, 3.2, 'Rajt', 'Tiszaörvéy', startingTime.value),
  new Section(2, 11.2, 'Tiszaörvéy', 'Tiszaderzs', startingTime.value),
  new Section(3, 8.2, 'Tiszaderzs', 'Abádszalók', startingTime.value),
  new Section(4, 2.7, 'Abádszalók', 'Abádszalók kikötő', startingTime.value),
  new Section(5, 6.6, 'Abádszalók kikötő', 'Kisköre', startingTime.value),
  new Section(6, 5.7, 'Kisköre', 'Dinnyéshát', startingTime.value),
  new Section(7, 9.3, 'Dinnyéshát', 'Sarud', startingTime.value),
  new Section(8, 8.2, 'Sarud', 'Poroszló', startingTime.value),
  new Section(9, 9.9, 'Poroszló', 'Fordító', startingTime.value),
  new Section(10, 9.9, 'Fordító', 'Poroszló', startingTime.value),
  new Section(11, 8.2, 'Poroszló', 'Sarud', startingTime.value),
  new Section(12, 9.3, 'Sarud', 'Dinnyéshát', startingTime.value),
  new Section(13, 5.7, 'Dinnyéshát', 'Kisköre', startingTime.value),
  new Section(14, 6.6, 'Kisköre', 'Abádszalók kikötő', startingTime.value),
  new Section(15, 2.7, 'Abádszalók kikötő', 'Abádszalók', startingTime.value),
  new Section(16, 8.2, 'Abádszalók', 'Tiszaderzs', startingTime.value),
  new Section(17, 11.2, 'Tiszaderzs', 'Tiszaörvéy', startingTime.value),
  new Section(18, 3.2, 'Tiszaörvéy', 'Cél', startingTime.value)
];

const runners: Runner[] = [
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

const availableStartingTimes = Array.from({ length: 60 * 10 }, (_, i) => {
  const time = Duration.fromObject({ minutes: i }).plus({ hours: 5 });
  return { label: time.toFormat('hh:mm'), value: new SimpleDuration(time.hours, time.minutes, time.seconds) };
});

function calculateDuration(time1: SimpleDuration, time2: SimpleDuration) {
  const startTime = Duration.fromObject(time1);
  const runningTime = Duration.fromObject(time2);
  return startTime.minus(runningTime).toFormat('hh:mm:ss');
}

</script>

<template>
  <div class="flex">
    <div>Rajtidőpont</div>
    <div>
      <select v-model="startingTime">
        <option v-for="time in availableStartingTimes" :key="time.label" :value="time.value">{{ time.label }}</option>
      </select>
    </div>
  </div>

  <div class="flex flex-col">
    <div v-for="(section, index) in sections" :key="section.id" class="flex gap-3 py-3"
      :class="section.id % 2 === 0 ? 'bg-slate-200' : ''">
      <div class="items-center font-bold w-8">{{ section.id }}.</div>
      <div class="items-center w-64 bg-lime-400 p-1 rounded-md">{{ section.from }}</div>
      <div class="items-center text-white w-64 bg-cyan-600 p-1 rounded-md">{{ section.to }}</div>
      <div class="items-center text-gray-500 w-20 font-bold">{{ section.distance }} km</div>
      <div class="items-center flex w-32">
        <select v-model="selectedRunners[index]" class="p-1 bg-white">
          <option v-for="runner in runners" :key="runner.name" :value="runner">{{ runner.name }}</option>
        </select>
      </div>
      <div class="items-center flex gap-3">
        <input type="number" min="0" v-if="selectedRunners[index]" v-model="selectedRunners[index].pace.minutes"
          class="w-14 p-1" />
        <input type="number" min="0" v-if="selectedRunners[index]" v-model="selectedRunners[index].pace.seconds"
          class="w-14 p-1" />
      </div>
      <div class="items-center flex">
        {{ selectedRunners[index]?.formattedTime(sections[index].distance) }}
      </div>
      <div v-if="selectedRunners[index]" class="flex items-center">
        <div v-if="index === 0">
          {{ sections[0].calculateArrival(startingTime, selectedRunners[0]?.formattedTime(sections[0].distance)) }}
        </div>
        <div v-else>
          {{ sections[index].calculateArrival(sections[index - 1]?.arrival,
        selectedRunners[index]?.formattedTime(sections[index].distance)) }}
        </div>
      </div>
    </div>
  </div>

  <div class="flex">
    <div class="font-bold w-32">
      Összesen
    </div>
    <div class="font-bold w-32">
      {{ calculateDuration(sections[sections.length - 1].arrival, startingTime) }}
    </div>
  </div>

</template>
