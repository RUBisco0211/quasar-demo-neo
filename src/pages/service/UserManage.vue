<script setup lang="ts">
import type { User } from 'src/models/service';
import { ref, onMounted, watch } from 'vue';
import { QTableProps } from 'quasar';
import UserEditDialog from 'src/components/dialog/UserEditDialog.vue';
import { useQuasar } from 'quasar';
import useTablePagination from '../../composable/useTablePagination';
import { StringIndexedObject } from '../../models/common';
import { SelectProps } from '../../models/props';
import { useDebouncedRef } from '../../utils/useDebounceRef';
import Notify from 'src/utils/notify';

const $q = useQuasar();

const columns: QTableProps['columns'] = [
    {
        name: 'userId',
        label: '用户id',
        sortable: true,
        field: (row: User) => row.userId,
        align: 'center',
    },
    {
        name: 'username',
        label: '用户名',
        sortable: true,
        field: (row: User) => row.username,
        align: 'center',
    },
    {
        name: 'name',
        label: '姓名',
        sortable: true,
        field: (row: User) => row.name,
        align: 'center',
    },
    {
        name: 'phone',
        label: '手机号',
        sortable: true,
        field: (row: User) => row.phone,
        align: 'center',
    },
    {
        name: 'sex',
        label: '性别',
        sortable: true,
        field: (row: User) => row.sex,
        align: 'center',
    },
    {
        name: 'email',
        label: '邮箱',
        sortable: true,
        field: (row: User) => row.email,
        align: 'center',
    },
    {
        name: 'status',
        label: '账号状态',
        sortable: true,
        field: (row: User) => row.status,
        align: 'center',
    },
    {
        name: 'createTime',
        label: '创建时间',
        sortable: true,
        field: (row: User) => row.createTime,
        align: 'center',
    },
    {
        name: 'operations',
        label: '操作',
        sortable: false,
        field: 'operations',
        align: 'center',
    },
];
const rows = ref<User[]>([]);
const selection = ref<User[]>([]);
const loading = ref<boolean>(false);
const filter = ref<StringIndexedObject>({});
const filterSelects: SelectProps[] = [
    {
        formItemType: 'select',
        name: 'sex',
        label: '性别',
        icon: 'mdi-gender-male-female',
        options: [
            {
                label: '男',
                value: 1,
            },
            {
                label: '女',
                value: 0,
            },
        ],
    },
    {
        formItemType: 'select',
        name: 'status',
        label: '账号状态',
        icon: 'eva-person-outline',
        options: [
            {
                label: '启用',
                value: 1,
            },
            {
                label: '禁用',
                value: 0,
            },
        ],
    },
];
const searchText = useDebouncedRef<string>('', 200);

watch(
    filter,
    () => {
        reload();
    },
    { deep: true }
);

watch(searchText, () => {
    reload();
});

onMounted(() => {
    reload();
});

const openEditDialog = (type: 'add' | 'update' | 'detail', value: User) => {
    $q.dialog({
        component: UserEditDialog,
        componentProps: {
            type,
            value,
            onDeleteCallBack: deleteSingle,
        },
    }).onOk((payload: { value: User; type: 'add' | 'update' | 'detail' }) => {
        const { value, type } = payload;
        switch (type) {
            case 'add':
                // TODO: 新增用户信息
                console.log('add', value);
                Notify.successSingle('添加成功');
                break;
            case 'update':
                // TODO: 更新用户信息
                console.log('update', value);
                Notify.successSingle('修改成功');
                break;
        }
        reload();
    });
};

const reload = async () => {
    selection.value = [];
    loading.value = true;
    // TODO:按分页加载表
    console.log('reload');
    setTimeout(() => {
        rows.value = [];
        for (let i = 0; i < 20; i++) {
            rows.value.push({
                userId: i + 1,
                username: 'admin',
                name: 'admin',
                phone: '18759125150',
                email: '1205456072@qq.com',
                sex: Math.random() > 0.5 ? 0 : 1,
                status: Math.random() > 0.5 ? 0 : 1,
                createTime: '2024-01-17 10:48:20',
            });
        }
        loading.value = false;
    }, 1000);
};

const deleteSingle = async (id: number) => {
    $q.dialog({
        title: '删除确认',
        message: '确认要删除选中的用户吗',
        cancel: true,
        persistent: true,
    }).onOk(() => {
        // TODO: 单个删除
        console.log('delete', id);
        Notify.successSingle('删除成功');
        reload();
    });
};

const deleteBatch = async () => {
    $q.dialog({
        title: '批量删除确认',
        message: '确认要删除选中的用户吗',
        cancel: true,
        persistent: true,
    }).onOk(() => {
        // TODO: 批量删除
        console.log(
            'delete',
            selection.value.map((row: User) => row.userId)
        );
        Notify.successMultiple('删除成功');
        reload();
    });
};

const changeStatus = async (row: User) => {
    let { userId, status } = row;
    // TODO: 修改状态
    console.log('change Status', userId, !status);
    Notify.successSingle('修改成功');
    reload();
};

const { pagination, onRequest } = useTablePagination({
    rowsPerPage: 20,
    reloadCallBack: reload,
});
</script>

<template>
    <div class="q-pa-md">
        <q-table
            flat
            class="my-sticky-header-column-table"
            separator="vertical"
            :columns="columns"
            :rows="rows"
            :row-key="(row:User) => row.userId"
            selection="multiple"
            v-model:selected="selection"
            v-model:pagination="pagination"
            :loading="loading"
            @request="onRequest"
        >
            <!-- 顶部工具类插槽 -->
            <template v-slot:top="props">
                <q-toolbar class="q-my-xs">
                    <q-toolbar-title>搜索筛选</q-toolbar-title>
                </q-toolbar>
                <q-toolbar class="q-my-xs row q-col-gutter-x-md">
                    <q-select
                        v-for="select in filterSelects"
                        :key="select.name"
                        class="col-3"
                        v-model="filter[select.name]"
                        label="性别"
                        clearable
                        clear-icon="eva-close-outline"
                        options-dense
                        map-options
                        outlined
                        emit-value
                        dense
                        label-slot
                        :options="select.options"
                    >
                        <template v-slot:label>
                            <q-icon
                                :name="select.icon"
                                size="20px"
                                class="q-mr-xs"
                            ></q-icon
                            >{{ select.label }}
                        </template>
                    </q-select>
                </q-toolbar>
                <q-toolbar class="q-my-xs">
                    <q-input
                        dense
                        type="search"
                        placeholder="搜索..."
                        outlined
                        class="col-2"
                        v-model="searchText"
                        clear-icon="eva-close-outline"
                        clearable
                    >
                        <template v-slot:prepend>
                            <q-icon
                                name="eva-search-outline"
                                size="xs"
                            ></q-icon>
                        </template>
                    </q-input>
                    <q-space></q-space>
                    <q-btn
                        label="添加用户"
                        unelevated
                        text-color="primary"
                        icon="eva-person-add-outline"
                        stack
                        @click="openEditDialog('add', {})"
                    ></q-btn>
                    <q-btn
                        label="刷新"
                        unelevated
                        text-color="primary"
                        icon="eva-refresh-outline"
                        stack
                        @click="reload"
                    >
                    </q-btn>
                    <q-btn
                        label="切换全屏"
                        unelevated
                        text-color="primary"
                        stack
                        :icon="
                            props.inFullscreen
                                ? 'eva-collapse-outline'
                                : 'eva-expand-outline'
                        "
                        @click="props.toggleFullscreen"
                    ></q-btn>
                    <q-btn
                        label="导出"
                        unelevated
                        text-color="primary"
                        stack
                        icon="eva-download-outline"
                    >
                    </q-btn>
                    <q-btn
                        label="批量删除"
                        unelevated
                        text-color="negative"
                        icon="eva-trash-outline"
                        stack
                        :disable="selection.length === 0"
                        @click="deleteBatch"
                    >
                    </q-btn>
                </q-toolbar>
            </template>
            <!-- 表头勾选框插槽 -->
            <template v-slot:header-selection="scope">
                <q-checkbox
                    size="lg"
                    indeterminate-icon="eva-minus-circle"
                    checked-icon="eva-checkmark-circle-2"
                    unchecked-icon="eva-radio-button-off-outline"
                    v-model="scope.selected"
                    color="primary"
                />
            </template>
            <!-- 表体勾选框插槽 -->
            <template v-slot:body-selection="scope">
                <q-checkbox
                    size="lg"
                    checked-icon="eva-checkmark-circle-2"
                    unchecked-icon="eva-radio-button-off-outline"
                    v-model="scope.selected"
                    color="primary"
                />
            </template>
            <!-- 性别插槽 -->
            <template v-slot:body-cell-sex="props">
                <q-td :key="(row:User) => row.sex" :props="props">
                    <q-badge
                        class="q-mx-auto"
                        :color="props.row.sex === 0 ? 'primary' : 'secondary'"
                        :label="props.row.sex === 0 ? '男' : '女'"
                    ></q-badge>
                </q-td>
            </template>
            <!-- 帐号状态插槽 -->
            <template v-slot:body-cell-status="props">
                <q-td :key="(row:User) => row.status" :props="props">
                    <q-toggle
                        :model-value="props.row.status"
                        :true-value="1"
                        :false-value="0"
                        checked-icon="eva-checkmark"
                        :color="
                            props.row.status === 1 ? 'positive' : 'negative'
                        "
                        keep-color
                        :label="props.row.status === 1 ? '启用' : '禁用'"
                        unchecked-icon="eva-close"
                        @click="changeStatus(props.row)"
                    />
                </q-td>
            </template>
            <!-- 操作插槽 -->
            <template v-slot:body-cell-operations="props">
                <q-td :props="props" class="text-primary">
                    <q-btn
                        dense
                        flat
                        icon="eva-edit-2-outline"
                        @click="openEditDialog('update', props.row)"
                    >
                        <q-tooltip>修改</q-tooltip>
                    </q-btn>
                    <q-btn
                        dense
                        flat
                        icon="eva-eye-outline"
                        @click="openEditDialog('detail', props.row)"
                    >
                        <q-tooltip>查看详情</q-tooltip>
                    </q-btn>
                    <q-btn
                        dense
                        flat
                        icon="eva-trash-outline"
                        color="negative"
                        @click="deleteSingle(props.row.userId)"
                    >
                        <q-tooltip>删除</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
            <!-- 加载中插槽 -->
            <template v-slot:loading>
                <q-inner-loading showing>
                    <q-spinner-facebook size="100px" color="primary" />
                </q-inner-loading>
            </template>
        </q-table>
    </div>
</template>
