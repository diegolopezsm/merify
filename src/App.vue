<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/shared/components";
import BellIcon from "@/shared/components/icons/BellIcon.vue";
import PlugIcon from "@/shared/components/icons/PlugIcon.vue";
import IntegrationsView from "@/modules/integrations-view/IntegrationsView.vue";
import NotificationsView from "@/modules/notifications-view/NotificationsView.vue";

enum ActiveView {
  Notifications = "notifications",
  Integrations = "integrations",
}
const tabs = [
  {
    label: ActiveView.Notifications,
    icon: BellIcon,
  },
  {
    label: ActiveView.Integrations,
    icon: PlugIcon,
  },
];

const views = {
  notifications: NotificationsView,
  integrations: IntegrationsView,
};

const activeView = ref<ActiveView>(ActiveView.Integrations);

const setActiveView = (view: ActiveView) => {
  activeView.value = view;
};
</script>

<template>
  <div class="pb-2 py-7 px-2">
    <div class="px-4 bg-white shadow rounded-md py-4">
      <div class="flex gap-4 border-b-2 mb-4">
        <Button
          v-for="tab in tabs"
          class="rounded-b-none flex items-center gap-2"
          :key="tab.label"
          :variant="activeView === tab.label ? 'primary' : 'ghost'"
          @click="setActiveView(tab.label)"
        >
          <component :is="tab.icon" />
          <span class="first-letter:uppercase">{{ tab.label }}</span>
        </Button>
      </div>
      <KeepAlive>
        <Component :is="views[activeView]" />
      </KeepAlive>
    </div>
  </div>
</template>
