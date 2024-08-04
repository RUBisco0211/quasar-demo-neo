<template>
  <div>
    <v-chart
      autoresize
      :option="props.option"
      class="chart"
      theme="customed"
    ></v-chart>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);

import type { PieChartOption } from 'src/models/chartOptions';

const props = defineProps({
  option: Object as PropType<PieChartOption>,
});
</script>
