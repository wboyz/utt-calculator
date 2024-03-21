<script setup lang="ts">
useHead({ bodyAttrs: { class: 'bg-base-100', }, htmlAttrs: { lang: 'hu', 'data-theme': 'fantasy' } });

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

const { runners } = useRunner();

const availableStartingTimes = Array.from({ length: 60 * 10 }, (_, i) => {
  const time = Duration.fromObject({ minutes: i }).plus({ hours: 5 });
  return { label: time.toFormat('hh:mm'), value: new SimpleDuration(time.hours, time.minutes, time.seconds) };
});

function calculateDuration(time1: SimpleDuration, time2: SimpleDuration) {
  const startTime = Duration.fromObject(time1);
  const runningTime = Duration.fromObject(time2);
  return startTime.minus(runningTime).toFormat('hh:mm:ss');
}

const percent = computed(() => {
  return Math.floor((selectedRunners.value.filter(Boolean).length / sections.length) * 100);
});
</script>

<template>
  <div class="container px-6 mx-auto">
    <div class="flex items-center justify-center gap-3 my-3">
      <label class="flex-none" for="starting_time">
        <h1 class="text-lg font-bold">Rajtidőpont</h1>
      </label>
      <select v-model="startingTime" class="select select-bordered max-w-xs w-24" id="starting_time">
        <option v-for="time in availableStartingTimes" :key="time.label" :value="time.value">{{ time.label }}</option>
      </select>
    </div>

    <div class="flex flex-col">
      <div v-for="(section, index) in sections" :key="section.id" class="flex gap-3 py-2"
        :class="section.id % 2 === 0 ? 'bg-base-200' : ''">
        <div class="flex items-center font-bold w-8 px-2">{{ section.id }}.</div>
        <div class="flex items-center w-64 text-white bg-secondary p-1 rounded-md">{{ section.from }}</div>
        <div class="flex items-center w-64 bg-accent p-1 rounded-md">{{ section.to }}</div>
        <div class="flex items-center text-gray-500 w-20 font-bold">{{ section.distance }} km</div>
        <div class="items-center flex">
          <select v-model="selectedRunners[index]" class="select select-sm select-bordered w-full max-w-xs">
            <option v-for="runner in runners" :key="runner.name" :value="runner">{{ runner.name }}</option>
          </select>
        </div>
        <div class="items-center flex gap-3">
          <input type="number" min="0" v-if="selectedRunners[index]" v-model="selectedRunners[index].pace.minutes"
            class="w-20 input input-sm input-bordered max-w-xs" />
          <input type="number" min="0" v-if="selectedRunners[index]" v-model="selectedRunners[index].pace.seconds"
            class="w-20 input input-sm input-bordered max-w-xs" />
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

    <div class="flex mt-3 justify-center">
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>

          </div>
          <div class="stat-title">Total Distance</div>
          <div class="stat-value text-primary">130 KM</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

          </div>
          <div class="stat-title">Total Time</div>
          <div class="stat-value text-secondary">{{ calculateDuration(sections[sections.length - 1].arrival,
        startingTime) }}</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
            </svg>

          </div>
          <div class="stat-title">Progress</div>
          <div class="stat-value text-accent">{{ percent }}%</div>
        </div>

      </div>
    </div>
  </div>

</template>
