<script setup lang="ts">
import { cn } from "@/shared/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
const variants = cva("p-2 rounded-md cursor-pointer", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      ghost:
        "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
      outline:
        "bg-transparent text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
      link: "bg-transparent text-foreground underline-offset-4 hover:underline hover:bg-accent hover:text-accent-foreground",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "md",
  },
});

const props = defineProps<{
  variant?: VariantProps<typeof variants>["variant"];
  rounded?: VariantProps<typeof variants>["rounded"];
}>();
</script>

<template>
  <button
    :class="cn(variants({ variant: props.variant, rounded: props.rounded }), $attrs.class as string)"
  >
    <slot></slot>
  </button>
</template>
