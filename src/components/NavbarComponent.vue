<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonHeader, IonToolbar } from "@ionic/vue";
import { User } from "@vicons/tabler";
const router = useRouter();
</script>

<template>
  <ion-header>
    <ion-toolbar class="navbar">
      <img
        src="https://tr2storage.blob.core.windows.net/agencylogos/UmTh6gJoyuBQeE4MeT-LqtpXW7T613IlFq.png"
        alt="Miles Dreams"
        class="brand-navbar"
      />
      <div slot="end" class="navbar-actions">
        <span class="points-text">2500 Pontos</span>
        <User class="user-icon" @click="router.push('/tabs/settings')" />
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>
.navbar {
  display: flex;
  --background: #fff;
}

.brand-navbar {
  height: 40px;
  width: 160px;
  object-fit: contain;
  margin: 8px 0;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.points-text {
  font-weight: 600;
  font-size: 14px;
  margin-top: 12px;
  color: #f26b36;
}

.user-icon {
  width: 26px;
  height: 26px;
  color: #f26b36;
}

@media (prefers-color-scheme: dark) {
  .navbar {
    --background: #181818;
  }
}
</style>
