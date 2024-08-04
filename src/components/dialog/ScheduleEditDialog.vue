<template>
    <q-dialog ref="dialogRef" position="right" maximized persistent>
        <q-card style="width: 500px" flat>
            <q-card-section>
                <q-toolbar>
                    <q-icon
                        v-if="scheduleInfo.color"
                        name="mdi-circle"
                        :style="{ color: `${scheduleInfo.color}` }"
                    ></q-icon>
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
                            v-model="scheduleInfo[item.name]"
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
<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref, computed } from 'vue';
import { Schedule } from 'src/models/service';
import { FormItemProps } from 'src/models/props';
import FormItem from '../common/form/FormItem.vue';
import { date } from 'quasar';
const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent<{
    value: Schedule;
    type: 'add' | 'update' | 'detail';
}>();

const props = defineProps<{
    type: 'add' | 'update' | 'detail';
    value: Schedule;
    onDeleteCallBack?: (id: number) => void;
}>();

const editType = ref(props.type);
const timeMask = 'YYYY-MM-DD HH:mm';

const scheduleInfo = ref<Schedule>({ ...props.value });

const formTitle = computed(() => {
    return {
        add: '新增日程',
        update: '修改日程',
        detail: '日程详情',
    }[editType.value];
});

const formItems = ref<FormItemProps[]>([
    {
        formItemType: 'input',
        name: 'title',
        type: 'text',
        placeholder: '请输入日程标题',
        label: '标题 *',
        icon: 'eva-text-outline',
        rules: [(val: string) => (!!val && val.length > 0) || '请输入日程标题'],
    },
    {
        formItemType: 'input',
        name: 'content',
        type: 'text',
        placeholder: '请输入日程内容',
        label: '内容 *',
        icon: 'eva-edit-2-outline',
        rules: [(val: string) => (!!val && val.length > 0) || '请输入日程内容'],
    },
    {
        formItemType: 'dateTimePicker',
        name: 'startTime',
        placeholder: '请选择日程开始时间',
        label: '开始时间 *',
        icon: 'mdi-clock-start',
        rules: [
            (val: string) => (!!val && val.length > 0) || '请选择日程开始时间',
        ],
        mask: timeMask,
        withSeconds: false,
        dateOptions: (d: string) => {
            if (!scheduleInfo.value.endTime) return true;
            const st = date.adjustDate(new Date(d), {
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            const et = date.adjustDate(new Date(scheduleInfo.value.endTime), {
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            return et.getTime() >= st.getTime();
        },
    },
    {
        formItemType: 'dateTimePicker',
        name: 'endTime',
        placeholder: '请选择日程结束时间',
        label: '结束时间 *',
        icon: 'mdi-clock-end',
        withSeconds: false,
        rules: [
            (val: string) => (!!val && val.length > 0) || '请选择日程结束时间',
            (val: string) => {
                const st = new Date(scheduleInfo.value.startTime!);
                const et = new Date(val);
                return et.getTime() >= st.getTime() || '结束时间应晚于开始时间';
            },
        ],
        mask: timeMask,
        dateOptions: (d: string) => {
            if (!scheduleInfo.value.startTime) return true;
            const st = date.adjustDate(new Date(scheduleInfo.value.startTime), {
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            const et = date.adjustDate(new Date(d), {
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            return et.getTime() >= st.getTime();
        },
    },
    {
        formItemType: 'colorPicker',
        name: 'color',
        label: '颜色 *',
        icon: 'eva-color-palette-outline',
        placeholder: '请选择颜色',
        rules: [(val: string) => (!!val && val.length > 0) || '请选择颜色'],
    },
    {
        formItemType: 'input',
        name: 'url',
        type: 'url',
        placeholder: '请输入日程链接',
        label: '日程链接',
        icon: 'eva-link-2-outline',
        rules: [() => true || ''],
    },
    {
        formItemType: 'input',
        name: 'location',
        type: 'text',
        placeholder: '请输入日程地点',
        label: '地点',
        icon: 'eva-pin-outline',
        rules: [() => true || ''],
    },
    {
        formItemType: 'input',
        name: 'notes',
        type: 'textarea',
        placeholder: '请输入日程备注',
        label: '备注',
        icon: 'eva-clipboard-outline',
        rules: [() => true || ''],
    },
]);

const onSave = () => {
    onDialogOK({
        value: scheduleInfo.value,
        type: editType.value,
    });
};
const onReset = () => {
    scheduleInfo.value = { ...props.value };
};
const onDelete = () => {
    const { onDeleteCallBack } = props;
    onDeleteCallBack && onDeleteCallBack(props.value.scheduleId!);
    onDialogCancel();
};
</script>
