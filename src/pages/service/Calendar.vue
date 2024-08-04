<script setup lang="ts">
import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar';
import { ref, computed } from 'vue';
import { date } from 'quasar';
import { useQuasar } from 'quasar';
import ScheduleEditDialog from 'src/components/dialog/ScheduleEditDialog.vue';
import { Schedule } from '../../models/service';
import variables from 'src/css/variables.module.scss';
import Notify from 'src/utils/notify';
const $q = useQuasar();

const timeMask = 'YYYY-MM-DD HH:mm';
const dateMask = 'YYYY-MM-DD';

const selectedDate = ref(date.formatDate(new Date(), dateMask));
const calendarRef = ref<QCalendarMonth | null>(null);

const handleClickDay = (data: any) => {
    const time = date.formatDate(
        date.adjustDate(new Date(data.scope.timestamp.date), {
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        }),
        timeMask
    );
    openEditDialog('add', {
        startTime: time,
    });
};

const openEditDialog = (type: 'add' | 'update' | 'detail', value: Schedule) => {
    $q.dialog({
        component: ScheduleEditDialog,
        componentProps: {
            type,
            value,
            onDeleteCallBack: deleteSingle,
        },
    }).onOk(
        (payload: { value: Schedule; type: 'add' | 'update' | 'detail' }) => {
            const { value, type } = payload;
            switch (type) {
                case 'add':
                    // TODO: 新增日程
                    console.log('add', value);
                    Notify.successSingle('添加成功');
                    break;
                case 'update':
                    // TODO: 更新日程
                    console.log('update', value);
                    Notify.successSingle('修改成功');
                    break;
            }
        }
    );
};

const deleteSingle = (id: number) => {
    $q.dialog({
        title: '确认',
        message: '确认删除该日程吗？',
        cancel: true,
        ok: true,
        persistent: true,
    }).onOk(() => {
        // TODO: 删除日程
        console.log('delete', id);
        Notify.successSingle('删除成功');
    });
};

const getSchedules = computed(() => (d: string) => {
    return schedules.value.filter((sc) => {
        const st = new Date(sc.startTime!).getTime();
        const ds = new Date(d).getTime();
        const de = date.addToDate(new Date(d), { day: 1 }).getTime();
        const et = new Date(sc.endTime!).getTime();
        return !(et < ds || st > de);
    });
});

const hasEvents = computed(() => (d: string) => {
    for (const sc of schedules.value) {
        const st = new Date(sc.startTime!).getTime();
        const ds = new Date(d).getTime();
        const de = date.addToDate(new Date(d), { day: 1 }).getTime();
        const et = new Date(sc.endTime!).getTime();
        if (!(et < ds || st > de)) return true;
    }
    return false;
});

const getScheduleChipLabel = computed(() => (sc: Schedule, d: string) => {
    const st = new Date(sc.startTime!).getTime();
    const et = new Date(sc.endTime!).getTime();
    // 起始日期当天0时
    const ds = new Date(d).getTime();
    // 结束日期当天24时
    const de = date.addToDate(new Date(d), { day: 1 }).getTime();
    // 起始日期当天label
    if (st >= ds && st <= de) {
        return `${sc.title} - ${sc.startTime!.split(' ')[1]}`;
    }
    // 结束日期当天label
    if (et >= ds && et <= de) {
        return `${sc.title} - ${sc.endTime!.split(' ')[1]}`;
    }
    // 其他日期label
    return sc.title;
});

const schedules = ref<Schedule[]>([
    {
        scheduleId: 123,
        title: 'Schedule One',
        content: 'This is the content for the first schedule.',
        startTime: '2024-04-15 09:30',
        endTime: '2024-04-19 11:00',
        star: true,
        color: variables.primary,
        allDay: false,
        url: 'https://example.com/schedule/one',
        location: 'Conference Room A',
        notes: 'Notes for the first schedule.',
    },
    {
        scheduleId: 456,
        title: 'Schedule Two',
        content: 'This is the content for the second schedule.',
        startTime: '2024-04-20 14:15',
        endTime: '2024-04-26 16:00',
        star: false,
        color: variables.accent,
        allDay: false,
        url: 'https://example.com/schedule/two',
        location: 'Online Meeting',
        notes: 'No additional notes for this schedule.',
    },
    {
        scheduleId: 789,
        title: 'Schedule Three',
        content: 'Details for the third schedule.',
        startTime: '2024-04-10 10:00',
        endTime: '2024-04-13 12:30',
        star: false,
        color: variables.secondary,
        allDay: false,
        url: 'https://example.com/schedule/three',
        location: 'Training Room B',
        notes: 'Important notes for the third schedule.',
    },
    // ... 更多的对象可以按照相同的模式添加
    {
        scheduleId: 999,
        title: 'Schedule Ten',
        content: 'Final schedule details.',
        startTime: '2024-04-25 13:45',
        endTime: '2024-04-27 15:15',
        star: false,
        color: variables.positive,
        allDay: false,
        url: 'https://example.com/schedule/ten',
        location: 'Office Lobby',
        notes: 'Reminder: Bring your laptop for this schedule.',
    },
    // 可以继续添加至十个对象
]);
</script>
<template>
    <div class="q-pa-md">
        <q-card flat>
            <q-splitter v-model="ref(20).value" :limits="[20, 20]">
                <template #before>
                    <q-toolbar class="q-pa-md">
                        <q-btn
                            unelevated
                            push
                            class="full-width"
                            dense
                            color="primary"
                            icon="eva-plus-outline"
                            no-caps
                            label="添加日程"
                            @click="
                                openEditDialog('add', {
                                    startTime: date.formatDate(
                                        selectedDate,
                                        timeMask
                                    ),
                                })
                            "
                        />
                    </q-toolbar>
                    <q-separator></q-separator>
                    <q-date
                        v-model="selectedDate"
                        class="full-width bg-transparent"
                        minimal
                        :mask="dateMask"
                        years-in-month-view
                        first-day-of-week="1"
                        flat
                        :events="hasEvents"
                    ></q-date>
                    <q-separator></q-separator>
                    <q-list separator>
                        <q-item-label header> 日程列表 </q-item-label>
                        <q-item
                            v-for="sc in schedules.sort((a, b) => new Date(a.startTime!).getTime() - new Date(b.startTime!).getTime())"
                            :key="sc.scheduleId"
                        >
                            <q-item-section side>
                                <q-icon
                                    size="xs"
                                    name="mdi-circle"
                                    :style="{ color: `${sc.color}` }"
                                ></q-icon>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-h6">{{
                                    sc.title
                                }}</q-item-label>
                                <q-item-label
                                    ><q-icon
                                        name="eva-pin-outline"
                                        size="16px"
                                    ></q-icon
                                    >{{ sc.location }}</q-item-label
                                >
                                <q-item-label
                                    ><q-icon
                                        name="eva-clock-outline"
                                        size="16px"
                                    ></q-icon
                                    >{{ sc.startTime }}</q-item-label
                                >
                            </q-item-section>
                            <q-item-section side>
                                <q-btn-group flat>
                                    <q-btn
                                        dense
                                        flat
                                        color="primary"
                                        icon="eva-eye-outline"
                                        @click.stop="
                                            openEditDialog('detail', sc)
                                        "
                                    >
                                        <q-tooltip>查看详情</q-tooltip>
                                    </q-btn>
                                    <q-btn
                                        dense
                                        flat
                                        color="primary"
                                        icon="eva-edit-2-outline"
                                        @click.stop="
                                            openEditDialog('update', sc)
                                        "
                                    >
                                        <q-tooltip>修改</q-tooltip>
                                    </q-btn>
                                    <q-btn
                                        dense
                                        flat
                                        color="negative"
                                        icon="eva-trash-outline"
                                        @click.stop="
                                            deleteSingle(sc.scheduleId!)
                                        "
                                    >
                                        <q-tooltip>删除</q-tooltip>
                                    </q-btn>
                                </q-btn-group>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </template>
                <template #after>
                    <q-toolbar class="q-pa-md">
                        <q-btn-group unelevated>
                            <q-btn
                                dense
                                unelevated
                                icon="eva-arrow-left-outline"
                                @click="calendarRef!.prev()"
                            >
                                <q-tooltip>上个月</q-tooltip>
                            </q-btn>
                            <q-btn
                                dense
                                unelevated
                                icon="eva-arrow-right-outline"
                                @click="calendarRef!.next()"
                            >
                                <q-tooltip>下个月</q-tooltip>
                            </q-btn>
                            <q-btn
                                dense
                                unelevated
                                icon="mdi-calendar-today-outline"
                                @click="calendarRef!.moveToToday()"
                            >
                                <q-tooltip>今日</q-tooltip>
                            </q-btn>
                        </q-btn-group>
                        <q-toolbar-title>{{ selectedDate }}</q-toolbar-title>
                    </q-toolbar>
                    <q-separator></q-separator>
                    <q-calendar-month
                        animated
                        ref="calendarRef"
                        locale="zh-CN"
                        v-model="selectedDate"
                        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
                        day-height="200"
                        :class="$q.dark.isActive ? ['bg-dark'] : ['bg-white']"
                        @click-day="handleClickDay"
                    >
                        <template
                            #day="{
                                scope: {
                                    timestamp: { date },
                                },
                            }"
                        >
                            <q-chip
                                v-for="sc in getSchedules(date)"
                                :key="sc.scheduleId"
                                class="full-width q-py-md"
                                :label="getScheduleChipLabel(sc, date)"
                                square
                                :style="{
                                    'background-color': `${sc.color}`,
                                    color: 'white',
                                }"
                                @click.stop="openEditDialog('detail', sc)"
                                clickable
                            ></q-chip>
                        </template>
                    </q-calendar-month>
                </template>
            </q-splitter>
        </q-card>
    </div>
</template>
