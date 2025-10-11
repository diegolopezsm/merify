<script setup lang="ts">
import { ref } from "vue";
import { Toggle } from "@/shared/components";
import Card from "@/shared/components/card/Card.vue";
import SlackLogo from "@/shared/components/icons/SlackLogo.vue";

const integrations = [
  {
    id: "slack",
    name: "Slack",
    icon: SlackLogo,
    isEnabled: ref(false),
  },
];
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <h2 class="text-2xl font-bold">Integrations</h2>
    <Card
      v-for="integration in integrations"
      :key="integration.id"
      class="flex gap-2 p-4 w-full justify-between"
    >
      <div class="flex gap-2">
        <component :is="integration.icon" />
        <p>{{ integration.name }}</p>
      </div>
      <Toggle v-model="integration.isEnabled.value" />
    </Card>
  </div>
</template>
