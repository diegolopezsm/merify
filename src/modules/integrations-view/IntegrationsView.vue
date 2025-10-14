<script setup lang="ts">
import ActiveSlack from "@/modules/slack/components/SlackActivation.vue";
import ActiveGmail from "@/modules/gmail/components/GmailActivation.vue";
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Integrations</h2>
    <p class="text-sm text-muted-foreground mb-4">
      Connect your accounts to receive notifications
    </p>
    <div class="flex flex-wrap gap-3 w-full">
      <ActiveSlack />
      <ActiveGmail />
    </div>
  </div>
</template>
