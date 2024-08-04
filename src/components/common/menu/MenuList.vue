<template>
    <q-list>
        <menu-item v-for="(route, i) in routeList" :key="i" :item="route">
            <template v-slot:tooltip>
                <q-tooltip
                    v-if="props.mini"
                    anchor="center end"
                    self="center start"
                    transition-show="jump-right"
                    transition-hide="jump-left"
                    >{{ route.meta!.label }}</q-tooltip
                >
            </template>
        </menu-item>
    </q-list>
</template>
<script setup lang="ts">
const props = defineProps<{ mini?: boolean }>();
import MenuItem from 'src/components/common/menu/MenuItem.vue';

import { RouteRecordRaw, useRouter } from 'vue-router';
const router = useRouter();

const routeList: RouteRecordRaw[] =
    router.currentRoute.value.matched[1].children;
</script>
