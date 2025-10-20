<script setup lang="ts">
import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import InfoIcon from '@/shared/components/icons/InfoIcon.vue';
import WarningIcon from '@/shared/components/icons/WarningIcon.vue';
import ErrorIcon from '@/shared/components/icons/ErrorIcon.vue';
import SuccessIcon from '@/shared/components/icons/SuccessIcon.vue';

const variants = cva('flex items-start gap-3 p-4 rounded-lg border', {
  variants: {
    variant: {
      info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
      warning:
        'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100',
      error:
        'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
      success:
        'bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'info',
    size: 'md',
  },
});

const props = defineProps<{
  variant?: VariantProps<typeof variants>['variant'];
  size?: VariantProps<typeof variants>['size'];
  dismissible?: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  dismiss: [];
}>();

const iconMap = {
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  success: SuccessIcon,
};

const handleDismiss = () => {
  emit('dismiss');
};
</script>

<template>
  <div
    :class="
      cn(
        variants({
          variant: props.variant,
          size: props.size,
        }),
        $attrs.class as string
      )
    "
    role="alert"
  >
    <component
      :is="iconMap[variant || 'info']"
      class="flex-shrink-0 mt-0.5"
      :class="{
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
      }"
    />

    <div class="flex-1 min-w-0">
      <div v-if="title" class="font-semibold mb-1">
        {{ title }}
      </div>
      <div class="text-sm/relaxed">
        <slot></slot>
      </div>
    </div>

    <button
      v-if="dismissible"
      class="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      aria-label="Dismiss alert"
      @click="handleDismiss"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
      >
        <path
          d="M18 6L6 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 6l12 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>
