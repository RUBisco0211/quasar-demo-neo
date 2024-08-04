<template>
    <!-- 文字输入框 -->
    <q-input
        :name="props.item.name"
        v-if="
            props.item.formItemType === 'input' && props.item.type !== 'number'
        "
        :model-value="props.modelValue"
        @update:modelValue="emitValue"
        @clear="emits('update:model-value', undefined)"
        :readonly="props.readonly"
        :type="props.item.type"
        :rules="props.item.rules"
        :mask="props.item.mask"
        :prefix="props.item.prefix"
        :suffix="props.item.suffix"
        unmasked-value
        :placeholder="props.item.placeholder"
        label-slot
        clearable
        clear-icon="eva-close-outline"
        outlined
        :autogrow="props.item.type === 'textarea'"
    >
        <template #label>
            <q-icon :name="props.item.icon" size="20px" class="q-mr-xs"></q-icon
            >{{ props.item.label }}
        </template>
    </q-input>
    <!-- 数字输入框 -->
    <q-input
        :name="props.item.name"
        v-if="
            props.item.formItemType === 'input' && props.item.type == 'number'
        "
        :model-value="props.modelValue"
        @update:modelValue="emitValue"
        @clear="emits('update:model-value', undefined)"
        :readonly="props.readonly"
        type="number"
        :rules="props.item.rules"
        :mask="props.item.mask"
        :prefix="props.item.prefix"
        :suffix="props.item.suffix"
        unmasked-value
        :placeholder="props.item.placeholder"
        label-slot
        clearable
        clear-icon="eva-close-outline"
        outlined
    >
        <template #label>
            <q-icon :name="props.item.icon" size="20px" class="q-mr-xs"></q-icon
            >{{ props.item.label }}
        </template>
    </q-input>
    <!-- 下拉选择框 -->
    <q-select
        :name="props.item.name"
        v-if="props.item.formItemType === 'select'"
        :model-value="props.modelValue"
        @update:model-value="emitValue"
        :rules="props.item.rules"
        :readonly="props.readonly"
        options-dense
        clearable
        clear-icon="eva-close-outline"
        dropdown-icon="eva-arrow-down-outline"
        map-options
        outlined
        emit-value
        label-slot
        :options="props.item.options"
    >
        <template #label>
            <q-icon :name="props.item.icon" size="20px" class="q-mr-xs"></q-icon
            >{{ props.item.label }}
        </template>
    </q-select>
    <!-- 开关 -->
    <q-toggle
        class="q-mb-md"
        :name="props.item.name"
        v-if="props.item.formItemType === 'toggle'"
        :model-value="props.modelValue"
        @update:model-value="emitValue"
        keep-color
        :readonly="props.readonly"
        :label="props.item.label"
        :true-value="props.item.trueValue"
        :false-value="props.item.falseValue"
        :checked-icon="props.item.checkedIcon"
        :unchecked-icon="props.item.uncheckedIcon"
    >
    </q-toggle>
    <!-- 日期选择 -->
    <q-field
        :name="props.item.name"
        v-if="props.item.formItemType === 'datePicker'"
        :model-value="props.modelValue"
        @update:model-value="emitValue"
        :readonly="props.readonly"
        :rules="props.item.rules"
        unmasked-value
        :placeholder="props.item.placeholder"
        label-slot
        clearable
        clear-icon="eva-close-outline"
        outlined
    >
        <template #control>
            <div class="self-center full-width no-outline">
                {{ props.modelValue }}
            </div>
        </template>
        <template #label>
            <q-icon :name="props.item.icon" size="20px" class="q-mr-xs"></q-icon
            >{{ props.item.label }}
        </template>
        <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date
                :readonly="props.readonly"
                flat
                class="bg-transparent"
                :model-value="props.modelValue"
                @update:model-value="emitValue"
                :mask="props.item.mask"
                :options="props.item.options"
            >
                <div class="row items-center justify-end">
                    <q-btn v-close-popup label="关闭" color="primary" flat />
                </div>
            </q-date>
        </q-popup-proxy>
    </q-field>
    <!-- 日期时间选择 -->
    <q-field
        :name="props.item.name"
        v-if="props.item.formItemType === 'dateTimePicker'"
        :model-value="props.modelValue"
        @update:model-value="emitValue"
        :readonly="props.readonly"
        :rules="props.item.rules"
        unmasked-value
        :placeholder="props.item.placeholder"
        label-slot
        clearable
        clear-icon="eva-close-outline"
        outlined
    >
        <template #control>
            <div class="self-center full-width no-outline">
                {{ props.modelValue }}
            </div>
        </template>
        <template #label>
            <q-icon :name="props.item.icon" size="20px" class="q-mr-xs"></q-icon
            >{{ props.item.label }}
        </template>
        <q-popup-proxy transition-show="scale" transition-hide="scale">
            <div class="row">
                <div class="col-6">
                    <q-date
                        style="height: 400px"
                        :readonly="props.readonly"
                        flat
                        class="bg-transparent"
                        :model-value="props.modelValue"
                        @update:model-value="emitValue"
                        :mask="props.item.mask"
                        :options="props.item.dateOptions"
                    >
                    </q-date>
                </div>
                <div class="col-6">
                    <q-time
                        style="height: 400px"
                        :readonly="props.readonly"
                        flat
                        class="bg-transparent"
                        :model-value="props.modelValue"
                        @update:model-value="emitValue"
                        :mask="props.item.mask"
                        format24h
                        :with-seconds="props.item.withSeconds"
                        :options="props.item.timeOptions"
                    >
                    </q-time>
                </div>
            </div>
        </q-popup-proxy>
    </q-field>
    <!-- 颜色选择 -->
    <q-field
        :name="props.item.name"
        v-if="props.item.formItemType === 'colorPicker'"
        :model-value="props.modelValue"
        @update:model-value="emitValue"
        outlined
        clearable
        clear-icon="eva-close-outline"
        :readonly="props.readonly"
        :rules="props.item.rules"
        label-slot
        :placeholder="props.item.placeholder"
    >
        <template #label>
            <q-icon
                :name="props.item.icon"
                size="20px"
                class="q-mr-xs"
                :color="props.modelValue"
            ></q-icon
            >{{ props.item.label }}
        </template>
        <template #control>
            <div class="self-center full-width no-outline">
                {{ props.modelValue }}
            </div>
        </template>

        <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color
                :readonly="props.readonly"
                :model-value="props.modelValue"
                @update:model-value="emitValue"
            />
        </q-popup-proxy>
        <template #append>
            <q-icon
                name="mdi-circle"
                size="20px"
                :style="{ color: `${props.modelValue}` }"
            ></q-icon>
        </template>
    </q-field>
</template>
<script setup lang="ts">
import { FormItemProps } from '../../../models/props';
const props = defineProps<{
    item: FormItemProps;
    modelValue: any;
    readonly?: boolean;
    disabled?: boolean;
    color?: string;
}>();

const emits = defineEmits<{ (e: 'update:model-value', value: any): void }>();
const emitValue = (v: any) => {
    emits('update:model-value', v);
};
</script>
