<script setup lang="ts">
import { cn } from '@/shared/utils/cn';
</script>

<template>
  <div
    :class="
      cn(
        'bg-white rounded-lg shadow px-4 py-2 w-fit hover:shadow-lg  border border-gray-200 transition-all duration-300',
        $attrs.class as string
      )
    "
  >
    <slot></slot>
  </div>
</template>
