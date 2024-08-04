<template>
  <v-md-preview :text="props.text"></v-md-preview>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ text: string }>(), { text: '' });
</script>
