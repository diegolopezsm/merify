<script setup lang="ts">
import { cn } from "@/shared/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        destructive: "data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input",
        secondary: "data-[state=checked]:bg-secondary data-[state=unchecked]:bg-input",
        accent: "data-[state=checked]:bg-accent data-[state=unchecked]:bg-input",
      },
      size: {
        default: "h-6 w-11",
        sm: "h-4 w-7",
        lg: "h-8 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        lg: "h-7 w-7 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const props = withDefaults(
  defineProps<{
    variant?: VariantProps<typeof variants>["variant"];
    size?: VariantProps<typeof variants>["size"];
    modelValue?: boolean;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    variant: "default",
    size: "default",
    modelValue: false,
    disabled: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const handleToggle = () => {
  if (!props.disabled) {
    emit("update:modelValue", !props.modelValue);
  }
};
</script>

<template>
  <button
    :id="id"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-disabled="disabled"
    :data-state="modelValue ? 'checked' : 'unchecked'"
    :disabled="disabled"
    :class="cn(variants({ variant, size }), $attrs.class as string)"
    @click="handleToggle"
  >
    <span
      :class="cn(thumbVariants({ size }))"
      :data-state="modelValue ? 'checked' : 'unchecked'"
    />
  </button>
</template>
