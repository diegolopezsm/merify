<script setup lang="ts">
import { Button, Card, Toggle } from '@/shared/components';
import GmailLogo from '@/modules/gmail/components/GmailLogo.vue';
import { useGoogleAuth } from '@/modules/gmail/composables/use-google-auth';
import { useEnableGmail } from '@/modules/gmail/composables/use-enable-gmail';

const { googleAuth, isLoading, initGoogleAuth } = useGoogleAuth();

const { isGmailEnable, setIsGmailEnable } = useEnableGmail();

async function handleAuthClick() {
  const auth = await initGoogleAuth();
  setIsGmailEnable(auth.success);
}
</script>

<template>
  <Card class="flex gap-2 p-4 w-full justify-between max-w-80">
    <div class="flex gap-3">
      <GmailLogo class="size-10 object-contain" />
      <div>
        <p>Gmail</p>
        <p class="text-sm text-muted-foreground">
          Do not miss gmail important emails
        </p>
      </div>
      <Button
        v-if="!googleAuth"
        size="sm"
        :disabled="isLoading"
        @click="handleAuthClick"
      >
        Connect
      </Button>
      <Toggle v-if="googleAuth" v-model="isGmailEnable" />
    </div>
  </Card>
</template>
