<template>
  <div class="q-gutter-sm q-px-md q-py-sm">
    <q-chip
      v-for="t in tagList"
      :key="t.name!.toString()"
      square
      outline
      :color="isCurrentRoute(t) ? 'primary' : 'grey-6'"
      :text-color="isCurrentRoute(t) ? 'primary' : 'dark'"
      removable
      :icon="t.meta!.icon!.toString()"
      icon-remove="mdi-close"
      @click="switchRouteTag(t)"
      @remove="removeRouteTag(t)"
    >
      {{ t.meta!.label }}
    </q-chip>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import type { RouteTagProps } from 'src/models/common';
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
const router = useRouter();

const tagList = ref<RouteTagProps[]>([]);

onMounted(() => {
  const { path, name, meta } = router.currentRoute.value;
  tagList.value.push({ path, name, meta });
});

watch(router.currentRoute, (to: RouteLocationNormalizedLoaded) => {
  const { path, name, meta } = to;
  if (path.split('/')[1] === 'admin') addRouteTag({ path, name, meta });
});

const addRouteTag = (route: RouteTagProps) => {
  if (_findRouteIndex(route) === -1) {
    tagList.value.push(route);
  }
};
const removeRouteTag = (route: RouteTagProps) => {
  const index = tagList.value.findIndex((item) => item.path === route.path);
  if (index !== -1) {
    tagList.value.splice(index, 1);
  }
};
const switchRouteTag = (route: RouteTagProps) => {
  console.log(route);
  if (isCurrentRoute.value(route)) {
    return;
  }
  router.push(route.path);
};
const isCurrentRoute = computed(
  () => (route: RouteTagProps) => router.currentRoute.value.path === route.path
);
const _findRouteIndex = (route: RouteTagProps) =>
  tagList.value.findIndex((item) => item.path === route.path);
</script>
