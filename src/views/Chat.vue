<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonInput,
  IonButton,
  IonText
} from '@ionic/vue';
import NavbarComponent from '@/components/NavbarComponent.vue';

const message = ref('');

const now = ref(new Date());

onMounted(() => {
  now.value = new Date();
});

const isBusinessHours = computed(() => {
  const day = now.value.getDay();
  const hour = now.value.getHours();
  //const isWeekday = day >= 1 && day <= 5;
  const isWeekday = day;
  return isWeekday && hour >= 8 && hour < 19;
});

const sendToWhatsApp = () => {
  if (!message.value.trim() || !isBusinessHours.value) return;
  const phone = '351961435133';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message.value)}`;
  window.open(url, '_blank');
  message.value = '';
};
</script>

<template>
  <ion-page>
    <ion-header>
      <NavbarComponent />
    </ion-header>

    <ion-content :fullscreen="true" class="chat-content">
      <div class="chat-wrapper">
        <h2 class="chat-title">Fale com um atendente</h2>
        <p class="chat-description">
          Envie uma mensagem e nossa equipe responderá via WhatsApp.
        </p>

        <ion-text color="medium" class="info-text">
          Atendimento disponível de <strong>segunda a sexta</strong>, das <strong>08h às 18h</strong>.
        </ion-text>

        <ion-input
          v-model="message"
          placeholder="Digite sua mensagem..."
          class="chat-input"
          fill="solid"
          :disabled="!isBusinessHours"
        ></ion-input>

        <ion-button
          expand="block"
          class="send-button"
          @click="sendToWhatsApp"
          :disabled="!isBusinessHours || !message.trim()"
        >
          Enviar pelo WhatsApp
        </ion-button>

        <ion-text color="danger" v-if="!isBusinessHours">
          Atendimento indisponível no momento.
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.chat-content {
  --background: #f7f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-wrapper {
  width: 90%;
  max-width: 500px;
  margin: auto;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.chat-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e1e1e;
  margin: 0;
}

.chat-description {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.info-text {
  font-size: 13px;
  color: #999;
}

.chat-input {
  --background: #f1f1f1;
  --padding-start: 12px;
  --padding-end: 12px;
  border-radius: 8px;
  font-size: 15px;
}

.send-button {
  --background: #25d366;
  --color: #fff;
  font-weight: 500;
  border-radius: 8px;
}

/* DARK THEME */
@media (prefers-color-scheme: dark) {
  .chat-content {
    --background: #181818;
  }

  .chat-wrapper {
    background: #242424;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  }

  .chat-title {
    color: #f1f1f1;
  }

  .chat-description,
  .info-text {
    color: #aaa;
  }

  .chat-input {
    --background: #333;
    color: #eee;
  }
}
</style>
