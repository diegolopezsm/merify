<script setup lang="ts">
import { Button } from "@/shared/components";
import { el_api_getSlackConversations } from "@/shared/services/electron-api";

async function getChannels(): Promise<void> {
  try {
    const channels = await el_api_getSlackConversations();
    console.log(channels);
  } catch (error) {
    console.error("Error getting channels:", error);
  }
}
</script>

<template>
  <Button @click="getChannels()"> test </Button>
</template>
