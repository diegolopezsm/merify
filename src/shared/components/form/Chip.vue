<script setup lang="ts">
import { cn } from '@/shared/utils/cn';
import XIcon from '@/shared/components/icons/XIcon.vue';
import { cva, type VariantProps } from 'class-variance-authority';

const variants = cva(
  'inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border bg-background',
        ghost:
          'border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
        success:
          'border-transparent bg-green-500 text-white hover:bg-green-600',
        warning:
          'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'md',
    },
  }
);

const props = withDefaults(
  defineProps<{
    variant?: VariantProps<typeof variants>['variant'];
    size?: VariantProps<typeof variants>['size'];
    rounded?: VariantProps<typeof variants>['rounded'];
    disabled?: boolean;
    removable?: boolean;
    id?: string;
  }>(),
  {
    variant: 'default',
    size: 'md',
    rounded: 'md',
    disabled: false,
    removable: false,
  }
);

const emit = defineEmits<{
  remove: [];
  click: [];
}>();

const handleRemove = () => {
  emit('remove');
};

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

<template>
  <div
    :id="id"
    :class="
      cn(
        variants({
          variant,
          size,
          rounded,
        }),
        {
          'cursor-not-allowed opacity-50': disabled,
        },
        $attrs.class as string
      )
    "
    @click="handleClick"
  >
    <slot></slot>
    <template v-if="removable && !disabled">
      <span class="border h-full w-0"> </span>
      <button
        type="button"
        class="hover:bg-black/10 rounded-full cursor-pointer"
        aria-label="Remove"
        title="Remove"
        @click.stop="handleRemove"
      >
        <XIcon class="size-4" />
      </button>
    </template>
  </div>
</template>
