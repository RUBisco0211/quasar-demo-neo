<template>
    <q-item-label header v-if="props.item.meta!.groupName" class="q-ml-sm">
        {{ props.item.meta!.groupName as string }}
    </q-item-label>
    <q-expansion-item
        dense
        class="q-ma-sm"
        v-if="props.item!.children && props.item!.children.length > 0"
        expand-icon="eva-arrow-down-outline"
    >
        <template v-slot:header>
            <q-item-section
                side
                :class="$q.dark.isActive ? ['text-white'] : ['text-dark']"
            >
                <q-icon
                    :color="props.item!.meta!.color as string"
                    :name="props.item!.meta!.icon as string"
                    size="xs"
                />
            </q-item-section>
            <q-item-section>
                <q-item-label>{{ props.item!.meta!.label }}</q-item-label>
            </q-item-section>
            <slot name="tooltip"></slot>
        </template>
        <menu-item
            class="q-ma-sm dense-menu-item"
            v-for="(item, i) in props.item!.children"
            :item="item"
            :key="i"
        ></menu-item>
    </q-expansion-item>
    <q-item
        v-else
        class="q-ma-sm dense-menu-item"
        v-ripple
        dense
        clickable
        :to="{name: props.item!.name as string}"
        :active-class="$q.dark.isActive ? 'bg-dark-active' : 'bg-grey-4'"
        :inset-level="(props.item!.meta!.depth as number) * inset"
    >
        <q-item-section
            side
            :class="$q.dark.isActive ? ['text-white'] : ['text-grey-8']"
        >
            <q-icon
                :name="props.item!.meta!.icon as string"
                :color="props.item!.meta!.color as string ?? ''"
                size="xs"
            />
        </q-item-section>
        <q-item-section>
            <q-item-label class="text-weight-medium">{{
                props.item!.meta!.label
            }}</q-item-label>
        </q-item-section>
        <slot name="tooltip"></slot>
    </q-item>
    <q-separator inset v-if="props.item.meta!.separate"></q-separator>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

const inset = 0.5;
const props = defineProps<{
    item: RouteRecordRaw;
}>();
</script>
