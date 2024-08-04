<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar
        rounded
        :icon="props.item.icon"
        size="xl"
        :color="props.item.color"
        text-color="white"
      >
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-weight-bold">
        <span>
          {{ props.item.prefix ? props.item.prefix : '' }}
        </span>
        <span>
          {{ props.item.value!.toString() }}
        </span>
        <span>
          {{ props.item.suffix ? props.item.suffix : '' }}
        </span>
      </q-item-label>
      <q-item-label caption>{{ props.item.label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
import type { StatisticItemProps } from 'src/models/props';

const props = defineProps<StatisticItemProps>();
</script>
