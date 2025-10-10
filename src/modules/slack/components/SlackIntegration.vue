<script setup lang="ts">
import { onMounted, ref } from "vue";
import InitSlack from "@/modules/slack/components/InitSlack.vue";
import Conversations from "@/modules/slack/components/Conversations.vue";
import { getAuthService } from "@/modules/slack/services/get-auth-service";

const loading = ref(true);
const hasAuth = ref(false);

onMounted(() => {
  checkAuth();
});

const checkAuth = async () => {
  const auth = await getAuthService();
  hasAuth.value = !!auth;
  loading.value = false;
};
</script>

<template>
  <div class="col-span-12 bg-white/80 rounded-lg shadow px-4 py-2">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="hasAuth">
        <Conversations />
      </div>
      <InitSlack v-else />
    </div>
  </div>
</template>
