<template>
    <div class="row q-my-md">
        <q-card-section horizontal>
            <q-select
                style="width: 150px"
                transition-show="jump-up"
                transition-hide="jump-up"
                dense
                outlined
                options-dense
                map-options
                emit-value
                inline
                v-model="dateRange"
                :options="dateRangeOptions"
                @update:model-value="change"
            />
        </q-card-section>
        <q-space></q-space>
        <q-card-section horizontal>
            <q-btn disable flat v-if="dateRange!.begin && dateRange!.end">
                已选日期范围 : {{ dateRange!.begin }} ~
                {{ dateRange!.end }}
            </q-btn>
        </q-card-section>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { date } from 'quasar';

const dateFormat = 'YYYY-MM-DD';
const dateNow = new Date();
const dateToString = (d: Date) => date.formatDate(d, dateFormat);

const dateRangeOptions = ref<
    {
        label: string;
        value: DateRangeSelectProps['dateRange'];
    }[]
>([
    {
        label: '昨日',
        value: {
            begin: dateToString(date.subtractFromDate(dateNow, { days: 1 })),
            end: dateToString(dateNow),
        },
    },
    {
        label: '近7日',
        value: {
            begin: dateToString(date.subtractFromDate(dateNow, { days: 6 })),
            end: dateToString(dateNow),
        },
    },
    {
        label: '近30日',
        value: {
            begin: dateToString(date.subtractFromDate(dateNow, { days: 29 })),
            end: dateToString(dateNow),
        },
    },
    {
        label: '本周',
        value: {
            begin: dateToString(
                date.adjustDate(dateNow, {
                    date:
                        dateNow.getDate() -
                        (dateNow.getDay() === 0 ? 7 : dateNow.getDay()) +
                        1,
                })
            ),
            end: dateToString(dateNow),
        },
    },
    {
        label: '本月',
        value: {
            begin: dateToString(date.adjustDate(dateNow, { date: 1 })),
            end: dateToString(dateNow),
        },
    },
]);

export type DateRangeSelectProps = {
    dateRange: {
        begin: string;
        end: string;
    };
};

const emits = defineEmits<{
    (e: 'update:dateRange', value: DateRangeSelectProps['dateRange']): void;
}>();

const dateRange = ref(dateRangeOptions.value[0].value);

const change = () => {
    emits('update:dateRange', dateRange.value!);
};
</script>
