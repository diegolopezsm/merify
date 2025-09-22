<script setup lang="ts">
import { SLACK_GET_CHANNELS } from "@/shared/contants";
import { Card, Button } from "@/shared/components";
// import { WebClient } from "@slack/web-api";

// Initialize Slack authentication
function initSlackAuth(): void {
  console.log("initSlackAuth");
  window.electron.initSlackAuth();
}

// Get Slack channels
async function getChannels(): Promise<void> {
  try {
    const channels = await window.electron.invoke(SLACK_GET_CHANNELS);
    console.log(channels);
    // const client = new WebClient(token);

    // const result = await client.conversations.list();
    // console.log(result.channels);
  } catch (error) {
    console.error("Error getting channels:", error);
  }
}
</script>

<template>
  <Card class="flex flex-col items-center justify-center">
    <Button
      class="flex flex-col items-center justify-center"
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
  <Button @click="getChannels()"> test </Button>
</template>