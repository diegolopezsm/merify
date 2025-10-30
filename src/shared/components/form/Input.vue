<script setup lang="ts">
import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const variants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        destructive: 'border-destructive focus-visible:ring-destructive',
        ghost: 'border-transparent bg-transparent shadow-none',
      },
      size: {
        xs: 'h-6 px-1 text-xs',
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

withDefaults(
  defineProps<{
    variant?: VariantProps<typeof variants>['variant'];
    size?: VariantProps<typeof variants>['size'];
    modelValue?: string | number;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    id?: string;
    name?: string;
    autocomplete?: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    minlength?: number;
    maxlength?: number;
    pattern?: string;
  }>(),
  {
    variant: 'default',
    size: 'md',
    modelValue: '',
    disabled: false,
    readonly: false,
    type: 'text',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  focus: [event: any];
  blur: [event: any];
  input: [event: any];
  change: [event: any];
}>();

const handleInput = (event: any) => {
  emit('update:modelValue', event.target.value);
  emit('input', event);
};

const handleChange = (event: any) => {
  emit('change', event);
};

const handleFocus = (event: any) => {
  emit('focus', event);
};

const handleBlur = (event: any) => {
  emit('blur', event);
};
</script>

<template>
  <input
    :id="id"
    :name="name"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :required="required"
    :min="min"
    :max="max"
    :step="step"
    :minlength="minlength"
    :maxlength="maxlength"
    :pattern="pattern"
    :class="cn(variants({ variant, size }), $attrs.class as string)"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
