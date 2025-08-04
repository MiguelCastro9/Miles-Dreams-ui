<script setup lang="ts">
import { IonPage, IonHeader, IonContent, IonCard, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonLabel } from '@ionic/vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import { Edit, Help, BuildingCommunity, Logout } from '@vicons/tabler';

const user = {
  name: "Iara Costa",
  email: "iara.costa@email.com",
  photo: "https://randomuser.me/api/portraits/women/12.jpg",
  status: "2.500 pontos"
};
</script>

<template>
  <ion-page>
      <NavbarComponent />
    <ion-content :fullscreen="true" class="settings-content">

      <ion-card class="profile-card">
        <div class="profile-header">
          <img :src="user.photo" alt="Foto do usuário" class="profile-picture" />
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
        <ion-item button lines="none">
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

.profile-picture {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px 0 rgba(61,114,237,0.10);
  margin-right: 18px;
  border: 3px solid #fff5ee;
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
  color: #f26b36;
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