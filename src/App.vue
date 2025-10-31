<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Button, BannerAlert } from '@/shared/components';
import BellIcon from '@/shared/components/icons/BellIcon.vue';
import PlugIcon from '@/shared/components/icons/PlugIcon.vue';
import IntegrationsView from '@/modules/integrations-view/IntegrationsView.vue';
import NotificationsView from '@/modules/notifications-view/NotificationsView.vue';

const Notifications = 'notifications';
const Integrations = 'integrations';
const tabs = [
  {
    label: Notifications,
    icon: BellIcon,
  },
  {
    label: Integrations,
    icon: PlugIcon,
  },
];

const views = {
  notifications: NotificationsView,
  integrations: IntegrationsView,
};

const activeView = ref<string>(Notifications);

const setActiveView = (view: string) => {
  activeView.value = view;
};

const isOnline = ref(true);

onMounted(() => {
  isOnline.value = window.navigator.onLine;
  window.addEventListener('online', () => {
    isOnline.value = true;
  });
  window.addEventListener('offline', () => {
    isOnline.value = false;
  });
});
</script>

<template>
  <div class="pb-2 py-7 px-2">
    <div class="px-4 bg-white shadow rounded-md py-4">
      <BannerAlert
        v-if="!isOnline"
        variant="warning"
        title="You are offline"
        size="sm"
      >
        You are offline. Please check your internet connection and try again.
      </BannerAlert>
      <template v-else>
        <div
          class="flex gap-4 border-b-2 mb-4 sticky z-50 top-0 bg-white pt-2 shadow-md"
        >
          <Button
            v-for="tab in tabs"
            :key="tab.label"
            class="rounded-b-none flex items-center gap-2"
            :variant="activeView === tab.label ? 'primary' : 'ghost'"
            @click="setActiveView(tab.label)"
          >
            <component :is="tab.icon" />
            <span class="first-letter:uppercase">{{ tab.label }}</span>
          </Button>
        </div>
        <Component :is="views[activeView as keyof typeof views]" />
      </template>
    </div>
  </div>
</template>
