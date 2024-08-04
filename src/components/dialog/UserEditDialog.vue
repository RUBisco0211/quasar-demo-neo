<script setup lang="ts">
import type { User } from 'src/models/service';
import { computed, ref } from 'vue';
import { FormItemProps } from 'src/models/props';
import { useDialogPluginComponent } from 'quasar';
import FormItem from 'src/components/common/form/FormItem.vue';

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent<{
    value: User;
    type: 'add' | 'update' | 'detail';
}>();

const props = defineProps<{
    type: 'add' | 'update' | 'detail';
    value: User;
    onDeleteCallBack?: (id: number) => void;
}>();

const editType = ref(props.type);

const formTitle = computed(() => {
    return {
        add: '新增用户',
        update: '修改用户',
        detail: '用户详情',
    }[editType.value];
});

const formItems: FormItemProps[] = [
    {
        formItemType: 'input',
        name: 'name',
        type: 'text',
        placeholder: '请输入姓名',
        label: '姓名 *',
        icon: 'eva-text-outline',
        rules: [(val: string) => (!!val && val.length > 0) || '请输入姓名'],
    },
    {
        formItemType: 'input',
        name: 'username',
        type: 'text',
        placeholder: '请输入用户名',
        label: '用户名 *',
        icon: 'eva-person-outline',
        rules: [(val: string) => (!!val && val.length > 0) || '请输入用户名'],
    },
    {
        formItemType: 'input',
        name: 'phone',
        type: 'text',
        placeholder: '请输入11位手机号',
        label: '手机号 *',
        icon: 'mdi-phone-outline',
        rules: [
            (val: string) => (!!val && val.length > 0) || '请输入手机号',
            (val: string) => val.length === 11 || '手机号尾数应为11位',
        ],
        mask: '###-####-####',
    },
    {
        formItemType: 'input',
        name: 'email',
        type: 'email',
        placeholder: '请输入邮箱账号',
        label: '邮箱账号 *',
        icon: 'eva-email-outline',
        rules: [
            (val: string) => (!!val && val.length > 0) || '请输入邮箱账号',
            'email',
        ],
    },
    {
        formItemType: 'select',
        name: 'sex',
        label: '性别 *',
        icon: 'mdi-gender-male-female',
        options: [
            {
                label: '男',
                value: 0,
            },
            {
                label: '女',
                value: 1,
            },
        ],
        rules: [(val: number) => val !== undefined || '请选择性别'],
    },
];

const userInfo = ref<User>({ ...props.value });

const onSave = () => {
    onDialogOK({
        value: userInfo.value,
        type: editType.value,
    });
};

const onReset = () => {
    userInfo.value = { ...props.value };
};

const onDelete = () => {
    const { onDeleteCallBack } = props;
    onDeleteCallBack && onDeleteCallBack(props.value.userId!);
    onDialogCancel();
};
</script>

<template>
    <q-dialog ref="dialogRef" position="right" maximized persistent>
        <q-card style="width: 500px" flat>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title class="text-h6">
                        {{ formTitle }}
                    </q-toolbar-title>
                    <q-space></q-space>
                    <q-btn
                        v-if="editType !== 'add'"
                        round
                        icon="eva-trash-outline"
                        @click="onDelete"
                        flat
                        color="negative"
                    >
                        <q-tooltip>删除</q-tooltip>
                    </q-btn>
                    <q-btn
                        v-if="editType === 'detail'"
                        round
                        icon="eva-edit-2-outline"
                        @click="editType = 'update'"
                        flat
                    >
                        <q-tooltip>修改</q-tooltip>
                    </q-btn>
                    <q-btn
                        v-if="editType === 'update'"
                        round
                        icon="eva-eye-outline"
                        @click="editType = 'detail'"
                        flat
                    >
                        <q-tooltip>查看详情</q-tooltip>
                    </q-btn>
                    <q-btn
                        round
                        icon="eva-close-outline"
                        @click="onDialogCancel"
                        flat
                    >
                        <q-tooltip>关闭</q-tooltip></q-btn
                    >
                </q-toolbar>
            </q-card-section>
            <q-separator></q-separator>
            <q-form @submit.prevent="onSave" @reset="onReset">
                <q-card-section class="q-pa-lg">
                    <div
                        v-for="item in formItems"
                        :key="item.name"
                        class="q-my-xs"
                    >
                        <form-item
                            :item="item"
                            :readonly="editType === 'detail'"
                            v-model="userInfo[item.name]"
                        ></form-item>
                    </div>
                    <q-btn
                        v-if="editType === 'add' || editType === 'update'"
                        type="submit"
                        label="保存"
                        class="q-mr-md"
                        unelevated
                        icon="eva-save-outline"
                        color="primary"
                    ></q-btn>
                    <q-btn
                        v-if="editType === 'add' || editType === 'update'"
                        type="reset"
                        label="重置"
                        outline
                        icon="mdi-notification-clear-all"
                        color="primary"
                    ></q-btn>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>
</template>
