<script setup lang="ts">
import { computed, ref } from 'vue';
import GmailLogo from '@/modules/gmail/components/GmailLogo.vue';
import { Button, Card, Input, Toggle, Chip } from '@/shared/components';
import { useGoogleAuth } from '@/modules/gmail/composables/use-google-auth';
import { useEnableGmail } from '@/modules/gmail/composables/use-enable-gmail';
import { usePriorityEmailsStore } from '@/modules/gmail/composables/use-priority-emails-store';

const { googleAuth, isLoading, initGoogleAuth } = useGoogleAuth();

const { isGmailEnable, setIsGmailEnable } = useEnableGmail();

const { primaryEmails, customEmails, addCustomEmail, removeCustomEmail } =
  usePriorityEmailsStore();

const emailAddress = ref<string>('');
const emailAddressesList = computed(() => [
  ...primaryEmails.value.map(email => ({ email, editable: false })),
  ...customEmails.value.map(email => ({ email, editable: true })),
]);

async function handleAuthClick() {
  const auth = await initGoogleAuth();
  setIsGmailEnable(auth.success);
}

function handleAddEmailAddress() {
  addCustomEmail(emailAddress.value);
  emailAddress.value = '';
}

function handleRemoveEmailAddress(email: string) {
  removeCustomEmail(email);
}
</script>

<template>
  <Card class="flex gap-2 p-4 w-full justify-between flex-col">
    <div class="flex gap-3">
      <GmailLogo class="size-10 object-contain" />
      <div>
        <p>Gmail</p>
        <p class="text-sm text-muted-foreground">
          Do not miss gmail important emails
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
        <Toggle v-if="googleAuth" v-model="isGmailEnable" />
      </div>
    </div>
    <div v-if="googleAuth" class="border-t border-border pt-2">
      <p class="text-sm text-muted-foreground mb-2">Priority email addresses</p>
      <div class="flex flex-wrap gap-2 max-h-21 overflow-x-auto">
        <Chip
          v-for="emailAddressItem in emailAddressesList"
          :key="emailAddressItem.email"
          class="text-xs text-muted-foreground"
          :class="{
            'pr-1': emailAddressItem.editable,
          }"
          variant="outline"
          :removable="emailAddressItem.editable"
          @remove="handleRemoveEmailAddress(emailAddressItem.email)"
        >
          {{ emailAddressItem.email }}
        </Chip>
      </div>
      <form
        v-if="googleAuth"
        class="flex gap-2 items-center w-full mt-3"
        @submit.prevent="handleAddEmailAddress"
      >
        <Input
          v-model="emailAddress"
          placeholder="Enter priority email address"
        />
        <Button size="sm" @click="handleAddEmailAddress"> Add </Button>
      </form>
    </div>
  </Card>
</template>
