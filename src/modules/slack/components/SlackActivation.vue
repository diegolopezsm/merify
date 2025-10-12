<script setup lang="ts">
import { watch } from "vue";
import { Card, Toggle } from "@/shared/components";
import { useStorage } from "@/shared/composables/use-storage";
import SlackLogo from "@/shared/components/icons/SlackLogo.vue";
import { SLACK_PLUGIN_ON } from "@/modules/slack/domain/constants";
import { useAsyncState } from "@/shared/composables/use-async-state";
import { initSlackAuth } from "@/modules/slack/services/init-slack-auth";
import { checkSlackAuth } from "@/modules/slack/services/check-slack-auth";

const isSlackEnable = useStorage(SLACK_PLUGIN_ON, false);

const { state: slackAuth } = useAsyncState(() => checkSlackAuth(), {
  ok: false,
  slackToken: undefined,
});

watch(slackAuth, async () => {
  const auth = await checkSlackAuth();
  if (!auth.slackToken) {
    isSlackEnable.value = false;
  }
});

watch(isSlackEnable, async (newVal) => {
  if (newVal === true) {
    const auth = await checkSlackAuth();
    if (!auth.slackToken) {
      const auth = await initSlackAuth();
      isSlackEnable.value = auth.success;
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
      <Toggle v-model="isSlackEnable" />
    </div>
  </Card>
</template>
