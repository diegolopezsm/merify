<script setup lang="ts">
import { Card, Toggle, Button } from "@/shared/components";
import { useStorage } from "@/shared/composables/use-storage";
import SlackLogo from "@/shared/components/icons/SlackLogo.vue";
import { SLACK_PLUGIN_ON } from "@/modules/slack/domain/constants";
import { useAsyncState } from "@/shared/composables/use-async-state";
import { initSlackAuth } from "@/modules/slack/services/init-slack-auth";
import { checkSlackAuth } from "@/modules/slack/services/check-slack-auth";

const isSlackEnable = useStorage(SLACK_PLUGIN_ON, false);

const {
  state: hasSlackAuth,
  isLoading,
  execute,
} = useAsyncState(() => checkSlackAuth(), false);

async function handleAuthClick() {
  const auth = await initSlackAuth();
  isSlackEnable.value = auth.success;
  execute();
}
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
      <Button
        v-if="!hasSlackAuth"
        size="sm"
        :disabled="isLoading"
        @click="handleAuthClick"
      >
        Connect
      </Button>
      <Toggle v-if="hasSlackAuth" v-model="isSlackEnable" />
    </div>
  </Card>
</template>
