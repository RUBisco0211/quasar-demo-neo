export interface StatisticItemProps {
  item: {
    icon?: string;
    color?: string;
    value?: number;
    prefix?: string;
    suffix?: string;
    label?: string;
  };
}

import type { QDateProps, QTimeProps, ValidationRule } from 'quasar';

export type InputProps = {
  formItemType: 'input';
  icon?: string;
  name: string;
  type?:
    | 'number'
    | 'textarea'
    | 'time'
    | 'text'
    | 'password'
    | 'email'
    | 'search'
    | 'tel'
    | 'file'
    | 'url'
    | 'date'
    | 'datetime-local';
  isPassword?: boolean;
  placeholder?: string;
  label?: string;
  rules?: ValidationRule[];
  prefix?: string;
  suffix?: string;
  mask?: string;
  hint?: string;
};

export type SelectProps = {
  formItemType: 'select';
  name: string;
  options: { label: string; value: any; disabled?: boolean }[];
  label?: string;
  icon?: string;
  multiple?: boolean;
  rules?: ValidationRule[];
};

export type ToggleProps = {
  formItemType: 'toggle';
  name: string;
  label?: string;
  uncheckedIcon?: string;
  checkedIcon?: string;
  trueValue?: any;
  falseValue?: any;
};

export type DatePickerProps = {
  formItemType: 'datePicker';
  name: string;
  label?: string;
  rules?: ValidationRule[];
  placeholder?: string;
  icon?: string;
  mask?: string;
  options?: QDateProps['options'];
};

export type DateTimePickerProps = {
  formItemType: 'dateTimePicker';
  name: string;
  label?: string;
  rules?: ValidationRule[];
  placeholder?: string;
  icon?: string;
  mask?: string;
  dateOptions?: QDateProps['options'];
  timeOptions?: QTimeProps['options'];
  withSeconds?: boolean;
};

export type ColorPickerProps = {
  formItemType: 'colorPicker';
  name: string;
  label?: string;
  rules?: ValidationRule[];
  placeholder?: string;
  icon?: string;
};
export type FormItemProps =
  | InputProps
  | SelectProps
  | ToggleProps
  | DatePickerProps
  | DateTimePickerProps
  | ColorPickerProps;

export interface DirectoryMenuItemProps {
  name: string;
  icon?: string;
  content?: File;
  path?: string;
  children?: DirectoryMenuItemProps[];
  code?: string;
  expanded?: boolean;
  src?: string;
}
