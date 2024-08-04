<script setup lang="ts">
import MenuList from 'components/common/menu/MenuList.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import useDarkStore from 'stores/dark';
const $q = useQuasar();
const { switchDarkMode } = useDarkStore();

const leftDrawerMini = ref(false);
const searchText = ref('');

const switchDrawerOpen = () => {
    leftDrawerMini.value = !leftDrawerMini.value;
};

const headerMenu = [
    {
        label: '搜索',
        icon: 'eva-search-outline',
        handler: () => {
            console.log('search');
        },
    },
    {
        label: '通知',
        icon: 'mdi-bell-badge-outline',
        handler: () => {
            console.log('notification');
        },
    },
    {
        label: '语言',
        icon: 'mdi-translate',
        handler: () => {
            console.log('language');
        },
    },
    {
        label: 'Github',
        icon: 'eva-github-outline',
        handler: () => {
            console.log('github');
        },
    },
];
</script>
<template>
    <q-layout view="hHh Lpr lFf">
        <q-header
            class="q-py-xs"
            :class="
                $q.dark.isActive
                    ? ['bg-dark', 'text-white']
                    : ['bg-white', 'text-dark']
            "
            bordered
        >
            <q-toolbar>
                <q-btn
                    flat
                    round
                    :icon="leftDrawerMini ? 'mdi-menu-open' : 'mdi-menu-close'"
                    @click="switchDrawerOpen"
                ></q-btn>
                <q-item style="width: 230px" class="q-pl-xs dense-menu-item">
                    <q-item-section side>
                        <q-avatar :class="{ 'shadow-7': !$q.dark.isActive }">
                            <q-img
                                src="icons/favicon-128x128.png"
                            ></q-img>
                        </q-avatar>
                    </q-item-section>
                    <q-item-section class="text-h6">
                        <q-item-label class="text-weight-bolder text-italic"
                            >Quasar</q-item-label
                        >
                    </q-item-section>
                </q-item>
                <q-space></q-space>
                <q-btn
                    unelevated
                    :color="$q.dark.isActive ? 'primary' : 'secondary'"
                    round
                    :icon="
                        $q.dark.isActive
                            ? 'eva-moon-outline'
                            : 'eva-sun-outline'
                    "
                    @click="switchDarkMode"
                >
                    <q-tooltip anchor="center left" self="center end"
                        >切换夜间模式</q-tooltip
                    >
                </q-btn>
                <div class="row" v-if="$q.screen.gt.sm">
                    <q-btn
                        v-for="btn in headerMenu"
                        flat
                        round
                        :key="btn.label"
                        :icon="btn.icon"
                    >
                        <q-tooltip>{{ btn.label }}</q-tooltip>
                    </q-btn>
                </div>
                <q-btn flat round icon="eva-more-vertical-outline" v-else>
                    <q-menu>
                        <q-list>
                            <q-item
                                v-for="btn in headerMenu"
                                :key="btn.label"
                                clickable
                                @click="btn.handler"
                            >
                                <q-item-section side>
                                    <q-icon :name="btn.icon"></q-icon>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ btn.label }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-drawer
            v-model="leftDrawerMini"
            show-if-above
            :width="250"
            :mini-width="48"
            :class="
                $q.dark.isActive
                    ? ['bg-dark-page', 'text-white']
                    : ['bg-grey-2', 'text-dark']
            "
        >
            <q-scroll-area style="height: calc(100% - 48px)">
                <menu-list class="q-my-sm" :mini="leftDrawerMini"></menu-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <q-scroll-area
                style="height: calc(100vh - 62.8px)"
                :thumb-style="{
                    right: '0px',
                    width: '8px',
                    opacity: '0.5',
                }"
            >
                <q-page
                    :class="
                        $q.dark.isActive
                            ? ['bg-dark-page', 'text-white']
                            : ['bg-grey-2', 'text-dark']
                    "
                >
                    <router-view v-slot="{ Component }">
                        <transition
                            appear
                            enter-active-class="animated fadeInRight"
                        >
                            <keep-alive
                                :include="[
                                    'DashBoard',
                                    'UserManage',
                                    'WorkSpace',
                                    'Document',
                                    'Calendar',
                                    'Chat',
                                ]"
                            >
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </q-page>
            </q-scroll-area>
        </q-page-container>
    </q-layout>
</template>
