<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
import { User, Coin, Home, Plane, MessageCircle } from '@vicons/tabler';

</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="tabs">
        <ion-tab-button tab="settings" href="/tabs/settings">
          <User class="icon-item" />
        </ion-tab-button>

        <ion-tab-button tab="points" href="/tabs/points">
          <Coin class="icon-item" />
        </ion-tab-button>

        <ion-tab-button tab="home" href="/tabs/home">
          <Home class="icon-item" />
        </ion-tab-button>

        <ion-tab-button tab="offers" href="/tabs/offers">
          <Plane class="icon-item" />
        </ion-tab-button>

        <ion-tab-button tab="chat" href="/tabs/chat">
          <MessageCircle class="icon-item" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<style scoped>

  ion-tab-button:active::after {
    --background: #3d72ed;
    --color: #fff;
  }

ion-tab-bar {
  --background: #fff;
  height: 64px;
  display: flex;
  align-items: center;
}

.icon-item {
  width: 26px;
  height: 26px;
}

@media (prefers-color-scheme: dark) {
   .tabs {
    --background: #181818;
    --color: #fff;
  }
}
</style>

