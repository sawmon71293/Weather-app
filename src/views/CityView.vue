<template>
  <Suspense>
    <AsyncCityView />
    <template #fallback>
      <CityViewSkeleton />
    </template>
  </Suspense>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>
