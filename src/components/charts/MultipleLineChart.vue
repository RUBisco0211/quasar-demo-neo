<template>
  <div>
    <v-chart
      autoresize
      :option="option"
      theme="customed"
      :class="props.class"
      :loading="loading"
      ref="lineChart"
    ></v-chart>
  </div>
</template>
<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// import { LineChartOption } from 'src/models/echartOptions/ChartOptions';

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);

const props = defineProps<{
  loading?: boolean;
  title?: string;
  xName?: string;
  yName?: string[];
  xAxisData?: string[];
  yAxisData?: number[][];
  class?: string;
}>();
const option = ref({
  title: {
    left: 'left',
    text: props.title,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: props.yName!,
    top: 'bottom',
  },
  xAxis: {
    name: props.xName,
    data: props.xAxisData,
  },
  yAxis: {
    type: 'value',
  },
  series: props.yAxisData!.map((data, i) => {
    return {
      name: props.yName![i],
      data: data,
      type: 'line',
      smooth: true,
    };
  }),
});
onUpdated(() => {
  option.value.xAxis.data = props.xAxisData;
  option.value.xAxis.name = props.xName;
  option.value.series = props.yAxisData!.map((data, i) => {
    return {
      name: props.yName![i],
      data: data,
      type: 'line',
      smooth: true,
    };
  });
});
</script>
