<script setup lang="ts">
import { Runner } from './models/runner';

const selectedRunners = ref<Runner[]>([]);
const startingTime = ref({ hours: 5, minutes: 0 });

const sections = [
  { id: 1, distance: 3.2, from: 'Rajt', to: 'Tiszaörvéy' },
  { id: 2, distance: 11.2, from: 'Tiszaörvéy', to: 'Tiszaderzs' },
  { id: 3, distance: 8.2, from: 'Tiszaderzs', to: 'Abádszalók' },
  { id: 4, distance: 2.7, from: 'Abádszalók', to: 'Abádszalók kikötő' },
  { id: 5, distance: 6.6, from: 'Abádszalók kikötő', to: 'Kisköre' },
  { id: 6, distance: 5.7, from: 'Kisköre', to: 'Dinnyéshát' },
  { id: 7, distance: 9.3, from: 'Dinnyéshát', to: 'Sarud' },
  { id: 8, distance: 8.2, from: 'Sarud', to: 'Poroszló' },
  { id: 9, distance: 9.9, from: 'Poroszló', to: 'Fordító' },
  { id: 10, distance: 9.9, from: 'Fordító', to: 'Poroszló' },
  { id: 11, distance: 8.2, from: 'Poroszló', to: 'Sarud' },
  { id: 12, distance: 9.3, from: 'Sarud', to: 'Dinnyéshát' },
  { id: 13, distance: 5.7, from: 'Dinnyéshát', to: 'Kisköre' },
  { id: 14, distance: 6.6, from: 'Kisköre', to: 'Abádszalók kikötő' },
  { id: 15, distance: 2.7, from: 'Abádszalók kikötő', to: 'Abádszalók' },
  { id: 16, distance: 8.2, from: 'Abádszalók', to: 'Tiszaderzs' },
  { id: 17, distance: 11.2, from: 'Tiszaderzs', to: 'Tiszaörvéy' },
  { id: 18, distance: 3.2, from: 'Tiszaörvéy', to: 'Cél' }
];

const runners = [
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
  const hours = Math.floor(i / 60) + 5;
  const minutes = i % 60;
  const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return { label: formatted, value: { hours, minutes } };
});

</script>

<template>
  <div class="flex">
    <div>Rajtidőpont</div>
    <div>
      <select v-model="startingTime">
        <option v-for="time in formattedTimes" :key="time.label" :value="time.value">{{ time.label }}</option>
      </select>
    </div>
  </div>

  <div class="flex">

    <div class="flex flex-col w-full">
      <div v-for="section in sections" :key="section.id" class="flex gap-3"
        :class="section.id % 2 === 0 ? 'bg-gray-200' : ''">
        <div class="text-lg font-bold w-8">{{ section.id }}.</div>
        <div class="text-lg w-64">{{ section.from }}</div>
        <div class="text-gray-500 w-64">{{ section.to }}</div>
        <div class="text-gray-500 w-20 font-bold">{{ section.distance }} km</div>
        <div class="flex w-32">
          <select v-model="selectedRunners[section.id]">
            <option v-for="runner in runners" :key="runner.name" :value="runner">{{ runner.name }}</option>
          </select>
        </div>
        <div class="flex w-14">
          {{ selectedRunners[section.id]?.pace }}
        </div>
        <div class="flex w-14">
          {{ selectedRunners[section.id]?.formattedTime(section.distance) }}
        </div>
        <div class="flex w-14">
          {{ selectedRunners[section.id]?.formattedTime(section.distance) }}
        </div>
      </div>
    </div>
  </div>

</template>
