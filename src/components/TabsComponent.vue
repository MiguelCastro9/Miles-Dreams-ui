<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IonTabBar, IonTabButton, IonTabs, IonPage, IonRouterOutlet, IonLoading } from '@ionic/vue';
import { Coin, Plane, MessageCircle } from '@vicons/tabler';

const chatLoading = ref(true);

onMounted(() => {
  (window as any)._digisac = {
    id: "84d56f00-ff50-4713-b3a5-deaa60189554",
    payload: {
      contact: {
        name: "João Silva",
        email: "joao.silva@gmail.com"
      }
    }
  };


  const script = document.createElement("script");
  script.src = "https://webchat.digisac.app/embedded.js";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    const widgetContainer = document.getElementById("umadivqualquer");
    if (widgetContainer) {
      widgetContainer.style.left = "49.97%";
      widgetContainer.style.right = "auto";
      widgetContainer.style.transform = "translateX(-50%)";
      widgetContainer.style.bottom = "0px";
      widgetContainer.style.position = "fixed";
      widgetContainer.style.zIndex = "9998";
      widgetContainer.style.opacity = "0";
      widgetContainer.style.pointerEvents = "auto";
    }
    chatLoading.value = false;
  };
});
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="tabs">

        <ion-tab-button tab="offers" href="/tabs/offers">
          <Plane class="icon-item" />
        </ion-tab-button>

        <ion-tab-button tab="chat">
          <MessageCircle class="icon-item" />
        </ion-tab-button>

        <ion-tab-button tab="points" href="/tabs/points">
          <Coin class="icon-item" />
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>

    <IonLoading
      :is-open="chatLoading"
      message="Carregando..."
      spinner="crescent"
    />
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

  /* ion-loading {
    --background: #e3edff;
    --spinner-color: #3d72ed;

    color: #1c6dff;
  } */

@media (prefers-color-scheme: dark) {
   .tabs {
    --background: #181818;
    --color: #fff;
  }
}
</style>

