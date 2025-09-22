<script setup lang="ts">
import { cn } from '@/shared/utils/cn';
</script>

<template>
  <button :class="cn('p-2 rounded-md cursor-pointer', $attrs.class as string)">
    <slot></slot>
  </button>
</template>