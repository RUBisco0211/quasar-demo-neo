<template>
  <q-breadcrumbs>
    <template v-slot:separator>
      <q-icon size="1em" name="mdi-chevron-double-right" />
    </template>
    <q-breadcrumbs-el
      :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
      v-for="(item, i) in pathItems"
      :key="item"
      :label="item"
      :icon="
        i === pathItems.length - 1 ? props.icon : 'mdi-folder-open-outline'
      "
    ></q-breadcrumbs-el>
  </q-breadcrumbs>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ path: string; icon: string }>();
const pathItems = computed(() => props.path.split('/'));
</script>
