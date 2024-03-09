<script setup lang="ts">
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Runner } from './models/runner';
import { Section } from './models/section';

dayjs.extend(duration);

const selectedRunners = ref<Runner[]>([]);
const startingTime = ref('05:00');

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
  new Runner('Runner 1', 5),
  new Runner('Runner 2', 6),
  new Runner('Runner 3', 7),
  new Runner('Runner 4', 5),
  new Runner('Runner 5', 6),
  new Runner('Runner 6', 7),
  new Runner('Runner 7', 5),
  new Runner('Runner 8', 6),
  new Runner('Runner 9', 7),
  new Runner('Runner 10', 5)
];

const formattedTimes = Array.from({ length: 60 * 10 }, (_, i) => {
  const time = dayjs.duration(i, 'minutes').add(5, 'hours');
  return time.format('HH:mm');
});

function calculateDuration(time1: string = '00:00', time2: string = '00:00') {
  const duration1 = dayjs.duration(time1);
  const duration2 = dayjs.duration(time2);
  const diffDuration = duration1.subtract(duration2);

  return diffDuration.format('HH:mm');
}

</script>

<template>
  <div class="flex">
    <div>Rajtidőpont</div>
    <div>
      <select v-model="startingTime">
        <option v-for="time in formattedTimes" :key="time" :value="time">{{ time }}</option>
      </select>
    </div>
  </div>

  <div class="flex flex-col">
    <div v-for="(section, index) in sections" :key="section.id" class="flex gap-3 h-8"
      :class="section.id % 2 === 0 ? 'bg-gray-200' : ''">
      <div class="items-center text-lg font-bold w-8">{{ section.id }}.</div>
      <div class="items-center text-lg w-64">{{ section.from }}</div>
      <div class="items-center text-gray-500 w-64">{{ section.to }}</div>
      <div class="items-center text-gray-500 w-20 font-bold">{{ section.distance }} km</div>
      <div class="items-center flex w-32">
        <select v-model="selectedRunners[index]">
          <option v-for="runner in runners" :key="runner.name" :value="runner">{{ runner.name }}</option>
        </select>
      </div>
      <div class="items-center flex w-14">
        <input type="number" v-if="selectedRunners[index]" v-model="selectedRunners[index].pace" class="w-14" />
      </div>
      <div class="items-center flex w-14">
        {{ selectedRunners[index]?.formattedTime(sections[index].distance) }}
      </div>
      <div v-if="selectedRunners[index]" class="flex items-center">
        <div v-if="index === 0">
          {{ sections[0].calculateArrival(startingTime, selectedRunners[0]?.formattedTime(sections[0].distance)) }}
        </div>
        <div v-else>
          {{ sections[index].calculateArrival(sections[index - 1]?.arrival, selectedRunners[index]?.formattedTime(sections[index].distance)) }}
        </div>
      </div>
    </div>
  </div>

  <div class="flex">
    <div class="text-lg font-bold w-32">
      Összesen
    </div>
    <div class="text-lg font-bold w-32">
      {{ calculateDuration(sections[sections.length - 1].arrival, startingTime) }} 
    </div>
  </div>

</template>
