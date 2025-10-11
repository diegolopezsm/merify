<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/shared/components";
import BellIcon from "@/shared/components/icons/BellIcon.vue";
import PlugIcon from "@/shared/components/icons/PlugIcon.vue";
import IntegrationsView from "@/modules/integrations-view/IntegrationsView.vue";

enum ActiveView {
  Notifications = "notifications",
  Integrations = "integrations",
}
const tabs = [
  {
    label: "Notifications",
    value: ActiveView.Notifications,
    icon: BellIcon,
  },
  {
    label: "Integrations",
    value: ActiveView.Integrations,
    icon: PlugIcon,
  },
];

const views = {
  notifications: IntegrationsView,
  integrations: IntegrationsView,
};

const activeView = ref<ActiveView>(ActiveView.Notifications);

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
          class="rounded-b-none flex items-center"
          :key="tab.value"
          :variant="activeView === tab.value ? 'primary' : 'ghost'"
          @click="setActiveView(tab.value)"
        >
          <component :is="tab.icon" /> {{ tab.label }}</Button
        >
      </div>
      <KeepAlive>
        <Component :is="views[activeView]" />
      </KeepAlive>
    </div>
  </div>
</template>
