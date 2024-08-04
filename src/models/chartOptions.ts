import type { ComposeOption } from 'echarts/core';
import type {
  LineSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  BarSeriesOption,
} from 'echarts/charts';
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
  GridComponentOption,
} from 'echarts/components';

export type LineChartOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | LineSeriesOption
>;

export type PieChartOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;

export type RadarChartOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | ToolboxComponentOption
  | LegendComponentOption
  | RadarSeriesOption
>;

export type BarChartOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | ToolboxComponentOption
  | LegendComponentOption
  | GridComponentOption
  | BarSeriesOption
>;
