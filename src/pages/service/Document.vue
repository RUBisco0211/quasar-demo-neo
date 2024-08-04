<template>
  <div class="q-pa-md">
    <q-card flat>
      <q-splitter v-model="splitterModel" :limits="[20, 50]">
        <template v-slot:before>
          <q-toolbar class="q-pa-md">
            <q-btn
              unelevated
              push
              class="full-width"
              dense
              color="primary"
              @click="getFile"
              icon="mdi-language-markdown"
              no-caps
              label="选择 .md 文件"
            >
            </q-btn>
          </q-toolbar>
          <q-separator></q-separator>
          <q-scroll-area
            style="height: calc(100vh - 63px - 64px - 1px - 2 * 16px - 2px)"
          >
            <q-list class="q-pa-none" v-if="fileList.length > 0">
              <directory-menu-item
                v-for="file in fileList"
                :key="file.name"
                :item="file"
                :file-selected-call-back="addTab"
              ></directory-menu-item>
            </q-list>
            <empty-view
              v-else
              icon="mdi-file-alert-outline"
              label="未选择 .md 文件"
            ></empty-view>
          </q-scroll-area>
        </template>
        <template v-slot:separator>
          <q-avatar
            color="primary"
            text-color="white"
            size="30px"
            icon="mdi-arrow-split-vertical"
            :class="$q.dark.isActive ? '' : 'shadow-7'"
          />
        </template>
        <template v-slot:after>
          <q-tabs
            outside-arrows
            mobile-arrows
            dense
            inline-label
            align="left"
            v-model="currentTabName"
            active-color="primary"
            switch-indicator
          >
            <q-tab
              class="ellipsis"
              v-for="(tab, i) in fileTabs"
              :key="tab.path"
              :name="tab.path"
              :icon="tab.icon"
              :label="tab.name"
              no-caps
            >
              <q-btn
                icon="mdi-close"
                size="10px"
                flat
                round
                dense
                @click.stop="deleteTabByIndex(tab, i)"
              ></q-btn>
            </q-tab>
          </q-tabs>
          <q-tab-panels
            v-model="currentTabName"
            class="bg-transparent"
            keep-alive
            animated
          >
            <q-tab-panel
              class="q-pa-none"
              v-for="tab in fileTabs"
              :key="tab.path"
              :name="tab.path"
            >
              <q-separator></q-separator>
              <q-scroll-area
                style="height: calc(100vh - 63px - 36px - 1px - 2 * 16px - 2px)"
              >
                <mark-down-article :text="tab.code"></mark-down-article>
              </q-scroll-area>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import MarkDownArticle from 'src/components/markdown/MarkDownArticle.vue';
import DirectoryMenuItem from 'src/components/service/DirectoryTreeMenu/DirectoryMenuItem.vue';
import EmptyView from 'src/components/common/EmptyView.vue';

import useMarkDownFilePicker from 'src/composable/useFilePicker';
import useFileViewerTabs from 'src/composable/useFileViewerTabs';

import { ref } from 'vue';

const { fileTabs, currentTabName, deleteTabByIndex, addTab, resetTabs } =
  useFileViewerTabs();
const { fileList, getFile } = useMarkDownFilePicker({
  fileUpdatedCallBck: resetTabs,
  fileIcon: 'mdi-language-markdown',
  openFilePickerOptions: {
    multiple: true,
    types: [
      {
        description: 'Markdown',
        accept: {
          'text/markdown': ['.md'],
        },
      },
    ],
  },
});
const splitterModel = ref(20);
</script>
