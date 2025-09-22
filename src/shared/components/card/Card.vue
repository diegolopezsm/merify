<script setup lang="ts">
import { cn } from '@/shared/utils/cn';
</script>

<template>
  <div :class="cn('bg-white rounded-lg shadow p-5 w-fit hover:shadow-lg transition-all duration-300', $attrs.class as string)">
    <slot></slot>
  </div>
</template>

