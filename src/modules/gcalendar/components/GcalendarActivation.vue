<script setup lang="ts">
import GcalendarLogo from '@/modules/gcalendar/components/GcalendarLogo.vue';
import { Button, Card, Toggle } from '@/shared/components';
import { useGoogleAuth } from '@/shared/composables/use-google-auth';
import { useEnableGcalendar } from '@/modules/gcalendar/composables/use-enable-gcalendar';

const { googleAuth, isLoading, initGoogleAuth } = useGoogleAuth();

const { isGcalendarEnable, setIsGcalendarEnable } = useEnableGcalendar();

async function handleAuthClick() {
  const auth = await initGoogleAuth();
  setIsGcalendarEnable(auth.success);
}
</script>

<template>
  <Card class="flex gap-2 p-4 w-full justify-between flex-col">
    <div class="flex gap-3">
      <GcalendarLogo class="size-10 object-contain" />
      <div>
        <p>Google Calendar</p>
        <p class="text-sm text-muted-foreground">
          Do not miss Google Calendar important events
        </p>
      </div>
      <div class="ml-auto">
        <Button
          v-if="!googleAuth"
          size="sm"
          :disabled="isLoading"
          @click="handleAuthClick"
        >
          Connect
        </Button>
        <Toggle v-if="googleAuth" v-model="isGcalendarEnable" />
      </div>
    </div>
  </Card>
</template>
