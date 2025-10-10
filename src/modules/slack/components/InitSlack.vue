<script setup lang="ts">
import { Card, Button } from "@/shared/components";
import SlackLogo from "./SlackLogo.vue";

function initSlackAuth(): void {
  window.electron.initSlackAuth();
}
</script>

<template>
  <Card class="w-full flex flex-col items-center justify-center">
    <Button
      class="flex flex-col items-center justify-center gap-2"
      @click="initSlackAuth"
    >
      <SlackLogo />
      <p>Add your Slack notifications</p>
    </Button>
  </Card>
</template>
