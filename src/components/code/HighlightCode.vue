<template>
  <div class="q-pa-lg">
    <highlightjs
      autodetect
      style="cursor: text"
      :code="props.code"
      :class="$q.dark.isActive ? 'hljs-atom-one-dark' : 'hljs-atom-one-light'"
    ></highlightjs>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  code: string;
}>();
</script>
