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
                            @click="getDirectory"
                            icon="mdi-folder-plus-outline"
                            label="选择文件夹"
                        >
                        </q-btn>
                    </q-toolbar>
                    <q-toolbar class="q-px-md q-pb-md">
                        <q-select
                            v-model="searchInput"
                            dense
                            transition-show="jump-up"
                            transition-hide="jump-up"
                            input-debounce="300"
                            use-input
                            hide-selected
                            placeholder="搜索文件..."
                            outlined
                            dropdown-icon="eva-arrow-down-outline"
                            options-dense
                            :options="fileOptions"
                            :option-value="(item:DirectoryMenuItemProps) => item"
                            @filter="onFilter"
                        >
                            <template v-slot:prepend>
                                <q-icon
                                    size="xs"
                                    name="eva-search-outline"
                                ></q-icon>
                            </template>
                            <template v-slot:option="scope">
                                <q-item
                                    class="dense-menu-option"
                                    dense
                                    v-bind="scope.itemProps"
                                    @click="
                                        addTab(
                                            scope.opt as DirectoryMenuItemProps
                                        )
                                    "
                                >
                                    <q-item-section side>
                                        <q-icon
                                            :name="scope.opt.icon"
                                            size="xs"
                                        ></q-icon>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>
                                            {{ scope.opt.path }}
                                        </q-item-label>
                                    </q-item-section>
                                    <q-item-section> </q-item-section>
                                </q-item>
                            </template>
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                        暂无文件
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                        <q-space></q-space>
                        <q-btn
                            flat
                            dense
                            @click="switchItemExpansion(directory!, true)"
                            icon="mdi-unfold-more-horizontal"
                        >
                            <q-tooltip> 展开全部 </q-tooltip>
                        </q-btn>
                        <q-btn
                            flat
                            dense
                            @click="switchItemExpansion(directory!, false)"
                            icon="mdi-unfold-less-horizontal"
                        >
                            <q-tooltip> 收起全部 </q-tooltip>
                        </q-btn>
                    </q-toolbar>
                    <q-separator></q-separator>
                    <q-scroll-area
                        style="
                            height: calc(
                                100vh - 63px - 64px - 56px - 1px - 2 * 16px -
                                    2px
                            );
                        "
                    >
                        <q-list class="q-pa-none" v-if="directory">
                            <directory-menu-item
                                :item="directory!"
                                :file-selected-call-back="addTab"
                            ></directory-menu-item>
                        </q-list>
                        <empty-view
                            v-else
                            icon="mdi-folder-alert-outline"
                            label="未选择文件夹"
                        ></empty-view>
                    </q-scroll-area>
                </template>
                <template v-slot:separator>
                    <q-avatar
                        color="primary"
                        text-color="white"
                        size="30px"
                        icon="eva-code-outline"
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
                            <file-path-bread-crumbs
                                class="q-px-md q-py-sm"
                                :icon="tab.icon!"
                                :path="tab.path!"
                            ></file-path-bread-crumbs>
                            <q-separator></q-separator>
                            <q-scroll-area
                                style="
                                    height: calc(
                                        100vh - 63px - 36px - 37px - 1px - 2 *
                                            16px - 2px
                                    );
                                "
                            >
                                <highlight-code
                                    :code="tab.code!"
                                    v-if="
                                        !['png', 'jpg', 'jpeg'].find(
                                            (v) =>
                                                v === tab.name.split('.').pop()
                                        )
                                    "
                                ></highlight-code>
                                <q-img
                                    :src="tab.src"
                                    v-else
                                    style="
                                        height: 50%;
                                        width: 50%;
                                        margin: auto;
                                    "
                                ></q-img>
                            </q-scroll-area>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>
        </q-card>
    </div>
</template>
<script setup lang="ts">
import FilePathBreadCrumbs from 'src/components/common/breadcrumbs/FilePathBreadCrumbs.vue';
import DirectoryMenuItem from 'src/components/service/DirectoryTreeMenu/DirectoryMenuItem.vue';
import EmptyView from 'src/components/common/EmptyView.vue';
import HighlightCode from 'src/components/code/HighLightCode.vue';

import useFileViewerTabs from 'src/composable/useFileViewerTabs';
import useDirectoryPicker from 'src/composable/useDirectoryPicker';

import { DirectoryMenuItemProps } from 'src/models/props';

import { ref } from 'vue';

const { fileTabs, currentTabName, deleteTabByIndex, addTab, resetTabs } =
    useFileViewerTabs();
const { directory, getDirectory, switchItemExpansion, fileList } =
    useDirectoryPicker({
        directoryUpdatedCallBack: resetTabs,
    });
const splitterModel = ref(20);

const fileOptions = ref<DirectoryMenuItemProps[]>([]);
const searchInput = ref('');

const onFilter = (val: string, update: any) => {
    update(() => {
        const needle = val.toLowerCase();
        fileOptions.value = fileList.value!.filter(
            (item) => item.path!.toLowerCase().indexOf(needle) > -1
        );
    });
};
</script>
<style></style>
