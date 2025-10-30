<script setup lang="ts">
import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const variants = cva(
  'bg-white rounded-lg shadow px-4 py-2 w-fit hover:shadow-md  border border-gray-300 transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-white rounded-lg shadow px-4 py-2 w-fit hover:shadow-md  border border-gray-300 transition-all duration-300',
        outline: 'shadow-none hover:shadow-none',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      defaultVariants: {
        variant: 'default',
        rounded: 'md',
      },
    },
  }
);

const props = defineProps<{
  variant?: VariantProps<typeof variants>['variant'];
  rounded?: VariantProps<typeof variants>['rounded'];
}>();
</script>

<template>
  <div
    :class="
      cn(
        variants({
          variant: props.variant,
          rounded: props.rounded,
        }),
        $attrs.class as string
      )
    "
  >
    <slot></slot>
  </div>
</template>
