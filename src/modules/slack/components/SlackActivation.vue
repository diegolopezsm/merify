<script setup lang="ts">
import { ref, watch } from "vue";
import { Card, Toggle } from "@/shared/components";
import SlackLogo from "@/shared/components/icons/SlackLogo.vue";
import { useAsyncState } from "@/shared/composables/use-async-state";
import { initSlackAuth } from "@/modules/slack/services/init-slack-auth";
import { checkSlackAuth } from "@/modules/slack/services/check-slack-auth";

const {
  data: slackAuth,
  loading,
  error,
} = useAsyncState(() => checkSlackAuth());

const isEnabled = ref(false);

watch(slackAuth, (newVal) => {
  isEnabled.value = newVal?.ok ?? false;
});

watch(isEnabled, async (newVal) => {
  if (newVal === true) {
    const auth = await checkSlackAuth();
    if (!auth.slackToken) {
      const auth = await initSlackAuth();
      isEnabled.value = auth.success;
    }
  }
});
</script>

<template>
  <Card class="flex gap-2 p-4 w-full justify-between max-w-80">
    <div class="flex gap-3">
      <SlackLogo />
      <div>
        <p>Slack</p>
        <p class="text-sm text-muted-foreground">
          Do not miss slack important messages
        </p>
      </div>
      <Toggle v-model="isEnabled" />
    </div>
  </Card>
</template>
