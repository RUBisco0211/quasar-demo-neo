<template>
  <div
    class="fullscreen text-white text-center q-pa-md flex flex-center"
    :class="$q.dark.isActive ? ['bg-dark-page'] : ['bg-grey-2']"
  >
    <div class="fixed-center">
      <q-img
        style="width: 600px"
        src="src/assets/illustrations/undraw_page_not_found_re_e9o6.svg"
      ></q-img>
      <div class="q-my-xl">
        <q-btn
          color="primary"
          push
          unelevated
          to="/"
          label="回到主页"
          no-caps
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
