<template>
  <q-expansion-item
    dense
    v-if="props.item?.children"
    :model-value="props.item?.expanded"
    @update:model-value="(val) => (props.item!.expanded = val)"
    expand-icon="mdi-chevron-down"
    :header-inset-level="getItemInset"
  >
    <template v-slot:header>
      <q-item-section side>
        <q-icon
          :name="props.item.expanded ? 'mdi-folder-open-outline':(props.item!.icon as string)"
          size="xs"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ props.item!.name }}</q-item-label>
      </q-item-section>
    </template>
    <directory-menu-item
      v-for="(item, i) in props.item?.children"
      :item="item"
      :file-selected-call-back="fileSelectedCallBack"
      :key="i"
    ></directory-menu-item>
  </q-expansion-item>
  <q-item
    v-else
    v-ripple
    dense
    clickable
    @click="fileSelectedCallBack({ ...props.item })"
    :active-class="$q.dark.isActive ? 'bg-primary' : 'bg-grey-4'"
    :inset-level="getItemInset"
  >
    <q-item-section side>
      <q-icon :name="(props.item!.icon as string)" size="xs" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-weight-medium">{{
        props.item!.name
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
import type { DirectoryMenuItemProps } from 'src/models/props';
import { computed } from 'vue';

const inset = 0.3;

const getItemInset = computed(() => {
  return props.item.path ? (props.item.path!.split('/').length - 1) * inset : 0;
});
const props = defineProps<{
  item: DirectoryMenuItemProps;
  fileSelectedCallBack: (item: DirectoryMenuItemProps) => void;
}>();
</script>
