<script setup lang="ts">
// import ActiveSlack from '@/modules/slack/components/SlackActivation.vue';
import GmailActivation from '@/modules/gmail/components/GmailActivation.vue';
import GcalendarActivation from '@/modules/gcalendar/components/GcalendarActivation.vue';
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">Integrations</h2>
    <p class="text-sm text-muted-foreground mb-4">
      Connect your accounts to receive notifications
    </p>
    <div class="flex flex-wrap gap-4 w-full">
      <!-- <ActiveSlack /> -->
      <GmailActivation />
      <GcalendarActivation />
    </div>
  </div>
</template>
