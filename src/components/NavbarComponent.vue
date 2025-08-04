<script setup lang="ts">
import {
  IonHeader,
  IonToolbar
} from "@ionic/vue";
</script>

<template>
  <ion-header>
    <ion-toolbar class="navbar">
      <img
        src="https://tr2storage.blob.core.windows.net/agencylogos/UmTh6gJoyuBQeE4MeT-LqtpXW7T613IlFq.png"
        alt="Miles Dreams"
        class="brand-navbar"
      />
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>
.navbar {
  display: flex;
  --background: #fff;
}

@media (prefers-color-scheme: dark) {
  .navbar {
    --background: #181818;
  }
}

.brand-navbar {
  height: 40px;
  width: 160px;
  object-fit: contain;
  margin: 8px 0;
  display: block;
}
</style>