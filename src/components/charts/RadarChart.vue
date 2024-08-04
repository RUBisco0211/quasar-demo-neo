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
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { PropType } from 'vue';

use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

import type { RadarChartOption } from 'src/models/chartOptions';

const props = defineProps({
  option: Object as PropType<RadarChartOption>,
});
</script>
src/models/echartOptions/chartOptions src/models/chartOptions
