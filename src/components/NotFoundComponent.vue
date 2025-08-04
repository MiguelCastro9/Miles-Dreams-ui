<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonButton } from '@ionic/vue';
const router = useRouter();
</script>

<template>
  <div class="container">
    <h2 class="title-container">Página não encontrada</h2>
    <ion-button shape="round" fill="outline" size="default" @click="router.push('/tabs/home')">
      Voltar
    </ion-button>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.title-container {
  font-size: 2rem;
  margin-bottom: 16px;
}
</style>
