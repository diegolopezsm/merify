<script setup lang="ts">
import { Card, Button } from "@/shared/components";

function initSlackAuth(): void {
  window.electron.initSlackAuth();
}
</script>

<template>
   <Card class="flex flex-col items-center justify-center">
    <Button
      class="flex flex-col items-center justify-center gap-2"
      @click="initSlackAuth"
    >
      <img
        src="@/assets/slack-new-logo.svg"
        alt="Slack Logo"
        class="w-10 h-10"
      />
      <p>Add your Slack notifications</p>
    </Button>
  </Card>
</template>
