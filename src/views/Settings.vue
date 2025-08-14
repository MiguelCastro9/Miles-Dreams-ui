<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardTitle, IonList, IonItem, IonLabel } from '@ionic/vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import { Edit, Help, BuildingCommunity, Logout, User } from '@vicons/tabler';
import { ref, onMounted } from 'vue';

const profileImage = ref<string | null>(null);

onMounted(() => {
  const storedImage = localStorage.getItem("profile-image");
  if (storedImage) {
    profileImage.value = storedImage;
  }
});

const user = {
  name: "João Silva",
  email: "joao.silva@example.com",
  status: "12 pontos"
};

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
</script>

<template>
  <ion-page>
    <NavbarComponent />
    <ion-content :fullscreen="true" class="settings-content">

      <ion-card class="profile-card">
        <div class="profile-header">
          <div class="profile-picture-wrapper">
            <img v-if="profileImage" :src="profileImage" alt="Foto do usuário" class="profile-picture"/>
            <User v-else class="profile-picture-placeholder"/>
          </div>
          <div class="profile-info">
            <ion-card-title class="profile-name">{{ user.name }}</ion-card-title>
            <ion-card-title class="profile-status">{{ user.status }}</ion-card-title>
            <div class="profile-email">{{ user.email }}</div>
          </div>
        </div>
      </ion-card>

      <ion-list class="settings-list">
        <ion-item button lines="none">
          <Edit class="icon-item" />
          <ion-label>Editar perfil</ion-label>
        </ion-item>
        <ion-item button lines="none">
          <Help class="icon-item" />
          <ion-label>Ajuda</ion-label>
        </ion-item>
        <ion-item button lines="none">
          <BuildingCommunity class="icon-item" />
          <ion-label>Sobre a Miles Dreams</ion-label>
        </ion-item>
        <ion-item button lines="none" @click="handleLogout">
          <Logout class="icon-item" />
          <ion-label>Sair</ion-label>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<style scoped>
.settings-content {
  --background: #f7f8fa;
}

.profile-card {
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  background: #fff;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 20px 18px;
}

.profile-picture-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px 0 rgba(61,114,237,0.10);
  margin-right: 18px;
  background: #fff5ee;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-picture-placeholder {
  width: 50%;
  height: 50%;
  color: #3d72ed;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.profile-status {
  color: #3d72ed;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.profile-email {
  color: #888;
}

.settings-list {
  margin: 16px 8px 0 8px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.04);
  overflow: hidden;
}

.tabler-icon {
  width: 22px;
  height: 22px;
  color: #f26b36;
}

.icon-item {
  width: 22px;
  height: 22px;
  margin-right: 14px;
  color: #3d72ed;
}

@media (prefers-color-scheme: dark) {
  .settings-content {
    --background: #181818;
  }
  .profile-card,
  .settings-list {
    background: #232a3a;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.24);
  }
  .profile-name,
  .profile-email {
    color: #fff;
  }
  .profile-status {
    color: #7faaff;
  }
}
</style>
