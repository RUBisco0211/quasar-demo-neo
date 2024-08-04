<template>
  <div>
    <v-chart
      autoresize
      :option="option"
      theme="customed"
      :class="props.class"
      :loading="props.loading"
    ></v-chart>
  </div>
</template>
<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
// import { BarChartOption } from 'src/models/echartOptions/ChartOptions';

use([
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

const props = defineProps<{
  loading?: boolean;
  title?: string;
  xName?: string;
  yName?: string;
  xAxisData?: number[];
  yAxisData?: string[];
  class?: string;
}>();
const option = ref({
  tooltip: {
    trigger: 'item',
    borderWidth: 0,
    axisPointer: { type: 'none' },
  },
  legend: {
    top: 'bottom',
  },
  grid: {
    left: '15%',
  },
  xAxis: {
    show: false,
    type: 'value',
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    type: 'category',
    data: props.yAxisData,
  },
  series: [
    {
      name: props.xName,
      type: 'bar',
      label: {
        show: true,
      },
      data: props.xAxisData,
    },
  ],
});
onUpdated(() => {
  option.value.yAxis!.data = props.yAxisData;
  option.value.series![0].data = props.xAxisData;
  option.value.series![0].name = props.xName;
});
</script>
