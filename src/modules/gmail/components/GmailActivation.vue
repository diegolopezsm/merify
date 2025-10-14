<script setup lang="ts">
import { Button, Card, Toggle } from "@/shared/components";
import { useStorage } from "@/shared/composables/use-storage";
import GmailLogo from "@/modules/gmail/components/GmailLogo.vue";
import { GMAIL_PLUGIN_ON } from "@/modules/gmail/domain/constants";
import { useAsyncState } from "@/shared/composables/use-async-state";
import { initGoogleAuth } from "@/modules/gmail/services/init-google-auth";
import { checkGoogleAuth } from "@/modules/gmail/services/check-google-auth";

const {
  state: hasGoogleAuth,
  isLoading,
  execute,
} = useAsyncState(() => checkGoogleAuth(), false);

const isGmailEnable = useStorage(GMAIL_PLUGIN_ON, false);

async function handleAuthClick() {
  const auth = await initGoogleAuth();
  isGmailEnable.value = auth.success;
  execute();
}
</script>

<template>
  <Card class="flex gap-2 p-4 w-full justify-between max-w-80">
    <div class="flex gap-3">
      <GmailLogo />
      <div>
        <p>Gmail</p>
        <p class="text-sm text-muted-foreground">
          Do not miss gmail important emails
        </p>
      </div>
      <Button
        v-if="!hasGoogleAuth"
        size="sm"
        :disabled="isLoading"
        @click="handleAuthClick"
      >
        Connect
      </Button>
      <Toggle v-if="hasGoogleAuth" v-model="isGmailEnable" />
    </div>
  </Card>
</template>
