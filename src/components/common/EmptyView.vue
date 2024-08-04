<template>
    <div
        class="text-center q-my-xl bg-transparent"
        style="width: 100%; opacity: 0.6"
        flat
    >
        <q-icon :name="props.icon" size="100px" color="primary"></q-icon>
        <div class="text-h6 text-primary text-center">{{ props.label }}</div>
    </div>
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string;
        label: string;
    }>(),
    {
        icon: 'mdi-archive-alert',
    }
);
</script>
