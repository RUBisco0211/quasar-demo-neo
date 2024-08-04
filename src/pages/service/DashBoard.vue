<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-item>
          <q-item-section side>
            <q-item-label
              class="text-h5 text-weight-bolder"
              :class="$q.dark.isActive ? ['text-white'] : ['text-dark']"
            >
              今日数据
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">{{
              dateToday
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <div class="row q-my-md">
          <statistic-item
            class="col"
            v-for="item in statItems"
            :item="item"
            :key="item.label"
          ></statistic-item>
        </div>
        <q-separator inset></q-separator>
      </div>
      <div class="col-6">
        <preset-date-range-select @update:date-range="getDateRange">
        </preset-date-range-select>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-card flat class="small-chart">
              <q-card-section>s1</q-card-section>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat class="small-chart">
              <q-card-section>s2</q-card-section>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat class="small-chart">
              <q-card-section>s3</q-card-section>
            </q-card>
          </div>
          <div class="col-6">
            <q-card flat class="small-chart">
              <q-card-section>s4</q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import StatisticItem from 'components/service/StatisticItem.vue';
import PresetDateRangeSelect from 'src/components/common/form/PresetDateRangeSelect.vue';

import { date } from 'quasar';
import { ref } from 'vue';
import type { StatisticItemProps } from 'src/models/props';

const dateToday = ref<string>(date.formatDate(new Date(), 'YYYY-MM-DD'));
const statItems = ref<StatisticItemProps['item'][]>([
  {
    icon: 'mdi-account-multiple-plus',
    color: 'primary',
    value: 5,
    suffix: '位',
    label: '新增用户数',
  },
  {
    icon: 'mdi-clipboard-check-multiple',
    color: 'positive',
    suffix: '%',
    value: 80,
    label: '订单完成率',
  },
  {
    icon: 'mdi-cash-multiple',
    color: 'secondary',
    value: 450,
    prefix: '￥',
    label: '营业额',
  },
  {
    icon: 'mdi-account-cash',
    color: 'accent',
    value: 45,
    prefix: '￥',
    label: '平均客单价',
  },
]);

const getDateRange = (value: { begin: string; end: string }) => {
  console.log(value);
};
</script>
