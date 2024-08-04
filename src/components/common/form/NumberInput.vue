<template>
  <div class="q-gutter-none q-pa-xs">
    <q-btn
      :disable="props.value <= props.min"
      color="primary"
      round
      icon="mdi-minus"
      size="xs"
      unelevated
      @click="sub"
    ></q-btn>
    <q-btn
      class="text-weight-bold"
      flat
      disable
      round
      :label="props.value"
    ></q-btn>
    <q-btn
      :disable="props.value >= props.max"
      color="primary"
      round
      icon="mdi-plus"
      size="xs"
      unelevated
      @click="add"
    ></q-btn>
  </div>
</template>
<script setup lang="ts">
export type NumberInputProps = {
  value: number;
  max: number;
  min: number;
};

const props = withDefaults(
  defineProps<{
    value: number;
    max: number;
    min: number;
    step?: number;
  }>(),
  {
    step: 1,
  }
);
const emits = defineEmits<{ (e: 'update:value', value: number): void }>();

const add = () => {
  if (props.value >= props.max) return;
  emits('update:value', props.value + props.step);
};

const sub = () => {
  if (props.value <= props.min) return;
  emits('update:value', props.value - props.step);
};
</script>
