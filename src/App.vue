<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/shared/components';
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
</script>

<template>
  <div class="pb-2 py-7 px-2">
    <div class="px-4 bg-white shadow rounded-md py-4">
      <div
        class="flex gap-4 border-b-2 mb-4 sticky top-0 bg-white pt-2 shadow-md"
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
      <KeepAlive>
        <Component :is="views[activeView as keyof typeof views]" />
      </KeepAlive>
    </div>
  </div>
</template>
