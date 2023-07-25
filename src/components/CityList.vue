<template>
  <div>
    <div v-if="loading">
      <!-- Show a loading message or spinner while data is being fetched -->
      <p>Loading cities...</p>
    </div>
    <div
      v-else
      v-for="city in savedCities"
      :key="city.id"
    >
      <CityCard
        :city="city"
        @click="goToCityView(city)"
      />
    </div>
    <p v-if="savedCities.length === 0">
      No locations added. To start tracking a location, search in the field
      above.
    </p>
  </div>
</template>

<script setup>
import CityCard from "./CityCard.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const loading = ref(true);
const savedCities = ref([]);
const appid = _APPID;
const getCities = async () => {
  try {
    if (localStorage.getItem("savedCities")) {
      savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
      const requests = [];
      savedCities.value.forEach((city) => {
        requests.push(
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${appid}&units=imperial`
          )
        );
      });
      const weatherData = await Promise.all(requests);

      // flicker delay
      await new Promise((res) => setTimeout(res, 1000));
      return weatherData;
    } else {
      loading.value = false;
    }
  } catch (err) {
    console.error("Error fetching cities:", err);
    // Handle errors appropriately
    loading.value = false;
    return [];
  }
};

onMounted(async () => {
  const weatherData = await getCities();
  if (weatherData) {
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });

    loading.value = false;
  }
});
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
