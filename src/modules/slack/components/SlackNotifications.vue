<script setup lang="ts">
import { Button } from "@/shared/components";
import { SLACK_GET_CONVERSATIONS } from "@/shared/contants";

async function getChannels(): Promise<void> {
  try {
    const channels = await window.electron.invoke(SLACK_GET_CONVERSATIONS);
    console.log(channels);
  } catch (error) {
    console.error("Error getting channels:", error);
  }
}
</script>

<template>
  <Button @click="getChannels()"> test </Button>
</template>
