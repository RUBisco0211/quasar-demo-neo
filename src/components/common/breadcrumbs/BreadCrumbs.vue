<template>
  <q-breadcrumbs>
    <template v-slot:separator>
      <q-icon size="1em" name="mdi-chevron-double-right" />
    </template>
    <q-breadcrumbs-el
      :class="props.textClass"
      v-for="item in breadCrumbs.slice(1)"
      :key="item.path"
      :label="(item.meta.label! as string)"
      :icon="(item.meta.icon! as string)"
      :to="item.path"
    ></q-breadcrumbs-el>
  </q-breadcrumbs>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const breadCrumbs = computed(() => {
  return router.currentRoute.value.matched;
});
const props = defineProps<{ textClass: string }>();
</script>
