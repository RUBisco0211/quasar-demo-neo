<template>
  <q-card
    flat
    class="row bg-transparent"
    :class="$q.dark.isActive ? ['text-white'] : ['text-grey-8']"
  >
    <q-card-section class="col-12 text-center q-pa-lg">
      <q-btn
        v-for="link in links"
        :key="link.name"
        flat
        round
        :icon="link.icon"
        :to="link.link"
      >
      </q-btn>
      <br />
      <div class="text-body1 q-mt-sm text-weight-bold">
        <q-icon name="mdi-copyright"></q-icon>
        2023 xxxx, Inc. All rights reserved.
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const links = ref([
  {
    name: 'github',
    icon: 'mdi-github',
    link: '',
  },
  {
    name: 'qq',
    icon: 'mdi-qqchat',
    link: '',
  },
  {
    name: 'weibo',
    icon: 'mdi-sina-weibo',
    link: '',
  },
  {
    name: 'wechat',
    icon: 'mdi-wechat',
    link: '',
  },
]);
</script>
