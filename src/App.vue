import { onMounted } from 'vue';
<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useDarkStore from 'stores/dark';
const { initDarkMode } = useDarkStore();
onMounted(() => {
  initDarkMode(false);
});
</script>
